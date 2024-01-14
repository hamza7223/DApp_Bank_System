import { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../../server/axiosApi";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  InputLabel,
  Input,
  FormGroup,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import "../App.css";
import Swal from "sweetalert2";

const StyledTable = styled(Table)`
  width: 95%;
  margin: 50px auto;
`;

const Head = styled(TableRow)`
  background: black;
  & > th {
    color: #fff;
    font-size: 18px;
    border-bottom: 1px solid black;
  }
`;

const Container1 = styled(InputLabel)`
  color: aliceblue;
`;

const Container2 = styled(Input)`
  color: aliceblue;
`;

const Container3 = styled(TableCell)`
  color: aliceblue;
`;

const Container = styled(FormGroup)`
  padding: 5%;
  text-align: center;
  & > div {
    margin-top: 20px;
    color: white;
  }
`;

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await deleteCustomer(id);
      getAllCustomers();
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/website-parallax-background-C.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120vh",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ paddingTop: "1vw" }}>
          <div className="Submission" style={{ margin: "0 auto" }}>
            <Container>
              <Typography variant="h4" className="mb-4">
                Search for Customer
              </Typography>
              <form>
                <FormControl>
                  <Container1>Enter Username</Container1>
                  <Container2
                    type="search"
                    placeholder="Enter Username"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </FormControl>
              </form>
            </Container>
          </div>
        </div>
        <StyledTable>
          <TableHead>
            <Head>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>CNIC Number</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Date of Creation</TableCell>
              <TableCell>Actions</TableCell>
            </Head>
          </TableHead>

          <TableBody>
            {customers
              .filter((customer) => {
                return search.toLowerCase() === ""
                  ? customer
                  : customer.username.toLowerCase().includes(search);
              })
              .map((customer) => (
                <TableRow key={customer.customerId}>
                  <Container3>{customer.name}</Container3>
                  <Container3>{customer.gender}</Container3>
                  <Container3>{customer.address}</Container3>
                  <Container3>{customer.cnic_number}</Container3>
                  <Container3>{customer.date_of_birth}</Container3>
                  <Container3>{customer.username}</Container3>
                  <Container3>{customer.password}</Container3>
                  <Container3>{customer.phone_number}</Container3>
                  <Container3>{customer.creation_date}</Container3>
                  <Container3>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        navigate(`/customers/edit/${customer._id}`)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(customer._id)}
                    >
                      Delete
                    </Button>
                  </Container3>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
      </div>
    </>
  );
};

export default AllCustomers;
