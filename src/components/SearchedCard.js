import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Col, Card, CardText, CardBody,
    CardTitle, Button
} from 'reactstrap';
import { getItemDetail } from "../action/Action";
import { Loader } from '../utils/Loader';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
    return {
        itemDetail: state.itemDetail
    };
};

const mapDispatchToProps = _dispatch => ({
    getItemDetail: (title) => _dispatch(getItemDetail(title))
});

class SearchedCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemDetail: ''
        }
        this.renderRedirect = this.renderRedirect.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
        if (state.itemDetail.length > 0) {
            return {};
        }
        return { itemDetail: props.itemDetail };
    }

    componentDidMount() {
        this.props.getItemDetail(this.props.colval);
    }

    static contextTypes = {
        router: PropTypes.object
    }

    renderRedirect() {
        this.context.router.history.push(`/stock/${this.props.colval}`);
    }

    render() {
        let renderCard;
        const { isLoading, detail } = this.state.itemDetail;
        if (isLoading) {
            renderCard = (
                <Card
                    inverse
                    className={`border-0 bg-gradient-theme`}
                    style={{
                        height: 200,
                    }}
                >
                    <CardBody className="d-flex flex-column justify-content-start align-items-start">
                        <CardTitle>{this.props.colval}</CardTitle>
                    </CardBody>
                    <CardBody className="d-flex justify-content-between align-items-center">
                        <Loader />
                    </CardBody>
                </Card>

            )
        }
        if (!isLoading) {
            renderCard = (
                <Card
                    inverse
                    className={`border-0 bg-gradient-theme`}
                    style={{
                        height: 200,
                    }}
                >
                    <CardBody className="d-flex flex-column justify-content-start align-items-start">
                        <CardTitle>{detail.symbol}</CardTitle>
                        <CardText>{detail.companyName.substring(0, 25)}</CardText>
                    </CardBody>
                    <CardBody className="d-flex justify-content-between align-items-center">
                        <CardText>{detail.description.substring(0, 70) + "..."}</CardText>
                        <Button outline color="light" onClick={this.renderRedirect}>
                            Click
            </Button>
                    </CardBody>
                </Card>
            )
        }
        return (
            <Col
                xl={4} lg={12} md={12}
                style={{
                    height: 200,
                }}
            >
                {renderCard}
            </Col>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchedCard);   