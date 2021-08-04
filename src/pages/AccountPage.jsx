import React, {useEffect, useState} from 'react'
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/cjs/Col";
import Button from "react-bootstrap/cjs/Button";
import NumberFormat from "react-number-format";

function AccountPage() {

    const [accounts, setAccounts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/api/accounts")
            .then(res => res.json())
            .then(
                (result) => {
                    setAccounts(result)
                    let total = 0
                    result.map((data, index) => {
                        total = total + parseFloat(data.balance.toString());
                        setTotal(total);
                    })

                },
                (error) => {
                    alert(error)
                }
            )
    }, []);


    return (<React.Fragment>
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Account Number</th>
                            <th>Account Type</th>
                            <th>Balance</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            accounts.map((data, index) => {
                                return <tr>
                                    <td>{data.account_number}</td>
                                    <td>{data.account_type}</td>
                                    <td>
                                        {
                                            <NumberFormat value={data.balance} displayType={'text'} thousandSeparator={true} prefix={'ZAR '} />
                                        }
                                    </td>
                                    <td>
                                        {
                                            data.account_type === "cheque" ?
                                                data.balance >= -500?
                                                <Button onClick={() => alert("success")}
                                                        variant={"success"}>Withdraw</Button> :
                                                <Button disabled
                                                        variant={"default"}>Withdraw</Button>:""
                                        }
                                        {data.account_type === "savings" ?
                                            data.balance > 0 ?
                                                <Button onClick={() => alert("success")}
                                                        variant={"success"}>Withdraw</Button> :
                                                <Button disabled
                                                        variant={"default"}>Withdraw</Button> :
                                            ""
                                        }
                                    </td>
                                </tr>
                            })
                        }
                        <tr>
                            <td>Total</td>
                            <td colSpan="3"><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'ZAR '} /></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    </React.Fragment>)
}

export default AccountPage;