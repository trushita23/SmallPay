import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReadInvoiceComp from "../../components/ReadInvoice";
import { saveAs } from "file-saver";
import moment from "moment";
import { BACKEND_URL } from "../../config";

const ReadInvoice = (props) => {
  const userInfo = props.userInfo;
  console.log("userinfo....", userInfo);
  const invoiceNumber = props.invoiceNumber;
  const [data, setData] = useState({});
  const [deleteRes, setDeleteRes] = useState("");
  const [editRes, setEditRes] = useState("");
  const [download, setDownload] = useState("");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `${BACKEND_URL}/fetchParticularInvoice?invoiceNumber=${invoiceNumber}`
      )
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchData = () => {
    const api = `${BACKEND_URL}/fetchParticularInvoice?invoiceNumber=${invoiceNumber}`;
    axios
      .get(api)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (invoiceNumber) => {
    axios
      .get(`${BACKEND_URL}/deleteInvoice?invoiceNumber=${invoiceNumber}`)
      .then((response) => {
        setDeleteRes(response.data.body);
        if (response.data.body === "success") {
          alert("Deleted Successfully");
          history.push("/invoiceList");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayment = (invoiceNumber) => {
    const paidDate = moment(Date.now()).format("MM/DD/yyyy");
    axios
      .get(
        `${BACKEND_URL}/editPayment?invoiceNumber=${invoiceNumber}&paidDate=${paidDate}`
      )
      .then((response) => {
        setEditRes(response.data.data);
        if (response.data.data === "success") {
          fetchData(); // reload data after deleting invoice
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ReadInvoiceComp
        data={data}
        handleDelete={handleDelete}
        handlePayment={handlePayment}
      />
    </>
  );
};

export default ReadInvoice;
