import { addCustomer } from "../../server/axiosApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swal } from "sweetalert2";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  FormHelperText,
} from "@mui/material";
import "../App.css";

const customerObj = {
  name: "",
  gender: "",
  address: "",
  date_of_birth: "",
  username: "",
  password: "",
  phone_number: "",
  cnic_number: "",
};

const Container = styled(FormGroup)`
  padding: 5%;
  text-align: center;

  & > div {
    margin-top: 20px;
    color: white;
  }
`;

const Container1 = styled(InputLabel)`
  color: aliceblue;
`;

const Container2 = styled(Input)`
  color: aliceblue;
`;

const StyledButton = styled(Button)`
  background-color: black;
  color: white;
  margin-top: 20px;
`;

const AddCustomer = () => {
  const [customer, setCustomer] = useState(customerObj);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateFields = () => {
    const newErrors = {};

    if (customer.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (customer.gender.trim() === "") {
      newErrors.gender = "Gender is required";
    }

    if (customer.address.trim() === "") {
      newErrors.address = "Address is required";
    }

    if (customer.cnic_number.trim() === "") {
      newErrors.cnic_number = "CNIC Number is required";
    }

    if (customer.date_of_birth.trim() === "") {
      newErrors.date_of_birth = "Date of Birth is required";
    }

    if (customer.username.trim() === "") {
      newErrors.username = "Username is required";
    }

    if (customer.password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (customer.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
    }

    if (customer.phone_number.trim() === "") {
      newErrors.phone_number = "Phone Number is required";
    } else if (customer.phone_number.length !== 11) {
      newErrors.phone_number = "Phone Number should be 11 characters long";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const addCustomerDetails = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    try {
      let response = await addCustomer(customer);
      if (response) {
        setSuccessMessage("Customer added successfully!");
        navigate("/customers/all");
      }
    } catch (error) {
      setErrorMessage("Failed to add customer. Please try again.");
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/website-parallax-background-C.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        <div className="Submission">
          <Container>
            <Typography variant="h4">Add Customer</Typography>
            <FormControl error={!!errors.name}>
              <Container1>Name</Container1>
              <Container2
                type="text"
                id="name"
                onChange={handleChange}
                name="name"
                placeholder="Your Full Name"
                required
              />
              {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
            </FormControl>
            <FormControl error={!!errors.gender}>
              <Container1>Gender</Container1>
              <Container2
                id="gender"
                name="gender"
                onChange={handleChange}
                required
              >
                <option selected disabled>
                  Choose Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Container2>
              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.address}>
              <Container1>Address</Container1>
              <Container2
                type="text"
                id="address"
                onChange={handleChange}
                name="address"
                placeholder="Your Address"
                required
              />
              {errors.address && (
                <FormHelperText>{errors.address}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.cnic_number}>
              <Container1>CNIC Number</Container1>
              <Container2
                type="text"
                id="cnic_number"
                onChange={handleChange}
                name="cnic_number"
                placeholder="xxxxx-xxxxxxxx"
                required
              />
              {errors.cnic_number && (
                <FormHelperText>{errors.cnic_number}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.date_of_birth}>
              <Container1>Date of Birth</Container1>
              <Container2
                type="date"
                id="date_of_birth"
                onChange={handleChange}
                name="date_of_birth"
                required
              />
              {errors.date_of_birth && (
                <FormHelperText>{errors.date_of_birth}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.username}>
              <Container1>User Name</Container1>
              <Container2
                type="text"
                id="username"
                onChange={handleChange}
                name="username"
                placeholder="Your Username"
                required
              />
              {errors.username && (
                <FormHelperText>{errors.username}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.password}>
              <Container1>Password</Container1>
              <Container2
                type="password"
                id="password"
                onChange={handleChange}
                name="password"
                placeholder="Your Password"
                required
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <FormControl error={!!errors.phone_number}>
              <Container1>Phone Number</Container1>
              <Container2
                type="text"
                id="phone_number"
                onChange={handleChange}
                name="phone_number"
                placeholder="xxxxxxxxxxxx"
                required
              />
              {errors.phone_number && (
                <FormHelperText>{errors.phone_number}</FormHelperText>
              )}
            </FormControl>
            <StyledButton variant="contained" onClick={addCustomerDetails}>
              Add Customer
            </StyledButton>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
