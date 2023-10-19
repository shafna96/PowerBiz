import jwt from "jsonwebtoken";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Middleware function to verify JWT token

export const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token"); // Assuming the token is sent in the header

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user information from the token in the request object
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Define the API endpoint for fetching navigation info
export const getNavigations = async (req, res) => {
  try {
    const { user_id, company_id } = req.user; // Get user information from the token
    //const { company_id } = req.body; // Get company_id from the request body
    // const { company_id } = req.params;
    const navigationInfo = await prisma.navigation.findMany({
      where: {
        UserGroupNavigation: {
          some: {
            userGroup: {
              userGroupUsers: {
                some: {
                  user_id: user_id,
                  company_id: company_id,
                },
              },
            },
          },
        },
        is_active: true, // Use boolean value for is_active
      },
      select: {
        navigation_name: true,
        page_title: true,
        page_url: true,
        id: true,
      },
    });

    res.status(200).json({ navigationInfo });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
