import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { authAPI, dataAPI } from "../services/api";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleAddUser = async () => {
    if (!name || !gmail) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const registered = await authAPI.register({
        fullName: name,
        email: gmail,
        password: "123456",
        role: "user",
      });
      if (registered?.message && !registered?.user) {
        throw new Error(registered.message);
      }

      const uid = registered?.user?.uid || registered?.user?._id;

      const userData = {
        name,
        email: gmail,
        uid,
        userId: uid,
        createdAt: new Date(),
      };

      await dataAPI.create("employees", userData);

      setStatus("✅ User added successfully!");
      setName("");
      setGmail("");
    } catch (error: any) {
      console.error("Error creating user:", error);
      setStatus("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h5" gutterBottom>
          Add New User
        </Typography>
        <TextField
          label="Full Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Gmail"
          type="email"
          fullWidth
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          margin="normal"
        />
        <Typography variant="caption" display="block" gutterBottom>
          Default password: <strong>123456</strong>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddUser}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create User"}
        </Button>
        {status && (
          <Typography mt={2} color={status.startsWith("✅") ? "green" : "red"}>
            {status}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AddUserPage;
