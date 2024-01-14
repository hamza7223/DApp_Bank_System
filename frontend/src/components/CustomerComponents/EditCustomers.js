import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomer, editCustomer } from "../../server/axiosApi";
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

const EditCustomer = () => {
  const [customer, setCustomer] = useState(customerObj);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCustomersInfo();
  }, []);

  const getCustomersInfo = async () => {
    let response = await getCustomer(id);
    setCustomer(response.data);
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const editCustomerDetails = async (e) => {
    e.preventDefault();

    if (
      !customer.name ||
      !customer.gender ||
      !customer.address ||
      !customer.date_of_birth ||
      !customer.username ||
      !customer.password ||
      !customer.phone_number ||
      !customer.cnic_number
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    if (customer.password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return;
    }
    if (customer.cnic_number.length > 15) {
      alert("CNIC Number should be a maximum of 15 characters.");
      return;
    }
    if (customer.phone_number.length !== 11) {
      alert("Phone Number should be 11 characters long.");
      return;
    }

    let response = await editCustomer(customer, id);
    if (response) {
      navigate("/customers/all");
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/website-parallax-background-C.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "140vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "20px",
        }}
      >
        <div className="Submission">
          <Container>
            <Typography variant="h4">Edit Customer</Typography>
            <FormControl className="mb-3" error={false}>
              <Container1>Name</Container1>
              <Container2
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Your Full Name"
                value={customer.name}
                required
              />
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>Gender</Container1>
              <Container2
                name="gender"
                onChange={handleChange}
                value={customer.gender}
                required
              >
                <option value="" disabled>
                  Choose Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Container2>
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>Address</Container1>
              <Container2
                type="text"
                onChange={handleChange}
                name="address"
                placeholder="Your Address"
                value={customer.address}
                required
              />
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>CNIC Number</Container1>
              <Container2
                type="text"
                onChange={handleChange}
                name="cnic_number"
                placeholder="xxxxx-xxxxxxxx"
                value={customer.cnic_number}
                required
              />
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>Date of Birth</Container1>
              <Container2
                type="date"
                onChange={handleChange}
                name="date_of_birth"
                value={customer.date_of_birth}
                required
              />
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>User Name</Container1>
              <Container2
                type="text"
                onChange={handleChange}
                name="username"
                placeholder="Your Username"
                value={customer.username}
                required
              />
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>Password</Container1>
              <Container2
                type="password"
                onChange={handleChange}
                name="password"
                placeholder="Your Password"
                value={customer.password}
                required
              />
            </FormControl>
            <FormControl className="mb-3" error={false}>
              <Container1>Phone Number</Container1>
              <Container2
                type="text"
                onChange={handleChange}
                name="phone_number"
                placeholder="xxxxxxxxxxxx"
                value={customer.phone_number}
                required
              />
            </FormControl>
            <StyledButton
              className="mb-3"
              variant="contained"
              onClick={editCustomerDetails}
            >
              Edit Customer
            </StyledButton>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
