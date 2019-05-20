import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Row, Col
} from 'reactstrap';
import Page from 'components/Page';
import { getItems } from "../action/Action";
import { Loader } from '../utils/Loader'; 
import  Searchedcard from '../components/SearchedCard';


const mapStateToProps = state => {
    return {
        item: state.items
    };
};

const mapDispatchToProps = _dispatch => ({
    getItems: () => _dispatch(getItems())
});


class SearchPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            item : ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.item.length > 0) {
          return {};
        }
        return { item: props.item };
    }

    componentDidMount() {
        this.props.getItems();
    } 
render() {
        // console.log(this.state.isLoading);
        const { isLoading, item } = this.state.item;
        const Coljsx = ({ colval }) => (
            <Searchedcard colval={colval} />
        );

        const Rowjsx = ({ rowitem }) => (
            <Row>
                {
                    rowitem.map((colval, index) => (
                        <Coljsx key={index} colval={colval} />
                    ))
                }
            </Row>
        );

        const RenderCrad = ({ item }) => (
            <Page title="Search" breadcrumbs={[{ name: 'Search', active: true }]}>
                {
                    item.reduce((pairs, itemData, index) => {
                        if (index % 3 === 0) {
                            pairs.push([]);
                        }
                        pairs[pairs.length - 1].push(itemData);
                        return pairs;
                    }, []).map((pair, index) => { 
                        return <Rowjsx key={index} rowitem={pair} />
                    })
                }

            </Page>
        );



        let renderCrad ;
        if (isLoading) {
            renderCrad = (
                <Page title="Search" breadcrumbs={[{ name: 'Search', active: true }]}>
                    <Row><Loader /></Row>
                </Page>
            )
        }else if (!isLoading && item.length > 0) {
            renderCrad = (
                <RenderCrad item={ item }>{ renderCrad } ></RenderCrad>
            )
        } else {
            renderCrad = (<Page title="Search" breadcrumbs={[{ name: 'Search', active: true }]}>
             <Row>
             <Col
                xl={4} lg={12} md={12}
                style={{
                    height: 200,
                }}
            >No recods!</Col> </Row>
            </Page>)
        }


        return (<div>{renderCrad}</div>);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);   