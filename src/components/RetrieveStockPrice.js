import React, { Component } from 'react';
import Page from 'components/Page';
import {
    Card, CardBody, CardHeader, Col, Row, Table, DropdownItem,
    DropdownMenu, UncontrolledButtonDropdown, DropdownToggle
} from 'reactstrap';
import { Loader } from '../utils/Loader';

class RetrieveStockPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: [],
            stockValue: '1m',
            tableDesign: '',
            isLoading: true
        };
        this.handleStockPriceChange = this.handleStockPriceChange.bind(this);
        this.handleTableDesignChange = this.handleTableDesignChange.bind(this);
    }

    componentDidMount(){
        this.fetApiData('1m');
    }

    fetApiData(period){
        this.setState({isLoading:true});
        const stockquote = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1);
        const baseUrl = 'https://api.iextrading.com/1.0/stock/';
        
        fetch(baseUrl + `${stockquote}/chart/${period}`)
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then((data) => { 
                    this.setState({
                        stock: data,
                        isLoading:false
                    }); 
                });
            }
            )
            .catch((err) => {
                console.log('Fetch Error :-S', err);
            });
    }
    handleStockPriceChange(event) {
        let period = event.currentTarget.textContent;
        this.setState({ 
            stockValue: period
        }, ()=>{
                this.fetApiData(period);
       });
    }
    handleTableDesignChange(e) {
        let dropDownValue = e.currentTarget.textContent.toLowerCase(); 
        this.setState({tableDesign: dropDownValue}) 
    }

    
    render() {
        const stockData = this.state.stock;  
        const tableType = this.state.tableDesign; 
        let renderTable;
        if(this.state.isLoading){
            renderTable = (<tr>
                <td><Loader /></td>
            </tr>)
        } else if (stockData.length > 0) {
            renderTable = (
                stockData.map((val, i) => (
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{val.date}</td>
                        <td>{val.close}</td>
                    </tr>
                ))
            );
        } else {
            renderTable = (<tr>
                <td>No Record found!</td>
            </tr>)
        }

        return (
            <Page
                title="Stock"
                breadcrumbs={[{ name: 'Stock', active: true }]}
                className="TablePage"
            >
                <Row >
                    <Col>
                        <Card className="mb-3">
                            <CardHeader> 
                            <UncontrolledButtonDropdown >
                                        <DropdownToggle
                                            caret
                                            color={'secondary'}
                                            className="text-capitalize m-1">
                                            {this.state.stockValue}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                             <DropdownItem ><div onClick={this.handleStockPriceChange}>1m</div></DropdownItem>
                                            <DropdownItem ><div onClick={this.handleStockPriceChange}>2m</div></DropdownItem>
                                            <DropdownItem ><div onClick={this.handleStockPriceChange}>3m</div></DropdownItem> 
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>

                                <UncontrolledButtonDropdown >
                                        <DropdownToggle
                                            caret
                                            color={'secondary'}
                                            className="text-capitalize m-1">
                                            {this.state.tableDesign || 'Select Table'}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem ><div onClick={this.handleTableDesignChange}>Hover</div></DropdownItem>
                                            <DropdownItem ><div onClick={this.handleTableDesignChange}>Striped</div></DropdownItem>
                                            <DropdownItem ><div onClick={this.handleTableDesignChange}>Bordered</div></DropdownItem> 
                                        </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                    
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <Card body> 
                                                <Table {...{ [tableType || 'default']: true }}>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Date</th>
                                                        <th>Close</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderTable}
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default RetrieveStockPrice;