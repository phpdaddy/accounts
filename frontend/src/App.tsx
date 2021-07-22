import React, {useEffect, useState} from 'react';
import './App.scss';
import {Col, Form, Nav, Row, Tab, Tabs} from "react-bootstrap";
import axios from 'axios';

function App() {
    const [views, setViews] = useState([] as any[]);
    const columns = [{id: 'created', label: 'Created'},
        {id: 'accountNumber', label: 'Account number'},
        {id: 'accountType', label: 'Account type'},
        {id: 'clientName', label: 'Client name'},
        {id: 'balance', label: 'Balance'}];


    useEffect(() => {
        const fetchAccounts = async () => {
            const result = await axios(
                'http://localhost:3001/accounts',
            );

            setViews(result.data);
        };

        fetchAccounts();
    }, []);

    return <Tab.Container defaultActiveKey="first">
        <Row>
            <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <Nav.Link eventKey="first">Administration</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Views</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
            <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">

                        <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
                            {views.map((v, index) => {
                                return <Tab key={index} eventKey={index} title={views[index].name || `View ${index}`}>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name"
                                                          defaultValue={views[index].name}
                                                          onChange={(e) => {
                                                              views[index].name = e.target.value;
                                                              setViews([...views]);
                                                          }}/>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Columns</Form.Label>
                                            {columns.map((c, cIndex) => {
                                                return <Form.Check name={c.id} key={cIndex} type="checkbox"
                                                                   label={c.label}
                                                                   checked={views[index].columns.filter((c2: string) => c2 === c.id).length}
                                                                   onChange={(e) => {
                                                                       if (!views[index].columns) {
                                                                           views[index].columns = [];
                                                                       }
                                                                       if (e.target.checked) {
                                                                           views[index].columns.push(c.id);
                                                                       } else {
                                                                           views[index].columns
                                                                               = views[index].columns.filter((c2: string) => c2 !== c.id);
                                                                       }
                                                                       setViews([...views]);
                                                                   }}/>;
                                            })}

                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Sort by</Form.Label>

                                            <Form.Select defaultValue={views[index].sortBy} onChange={(e) => {
                                                views[index].sortBy = (e.target as HTMLInputElement).value;
                                                setViews([...views]);
                                            }}>
                                                {columns.map((c, cIndex) => {
                                                    return <option key={c.id} value={c.id}>{c.label}</option>;
                                                })}

                                            </Form.Select>
                                            <Form.Select defaultValue={views[index].sortByOrder} onChange={(e) => {
                                                views[index].sortByOrder = (e.target as HTMLInputElement).value;
                                                setViews([...views]);
                                            }}>
                                                <option value="asc">Ascending</option>
                                                <option value="desc">Descending</option>

                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Page size</Form.Label>
                                            <Form.Control type="text" placeholder="Page size"
                                                          defaultValue={views[index].pageSize}
                                                          onChange={(e) => {
                                                              views[index].pageSize = e.target.value;
                                                              setViews([...views]);
                                                          }}/>
                                        </Form.Group>


                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            axios.post('http://localhost:3001/accounts',
                                                views);

                                        }}>Save
                                        </button>

                                        <button onClick={() => {
                                            setViews([...views.filter((v, i) => i === index)]);
                                        }}>Delete
                                        </button>
                                    </Form>
                                </Tab>;
                            })}

                        </Tabs>
                        <button onClick={() => {
                            setViews([...views, {}]);
                        }}>+
                        </button>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        Views
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>;
}

export default App;
