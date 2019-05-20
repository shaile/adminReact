import React, { Component } from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import { connect } from "react-redux";
import { fiterItems } from "../action/Action";
import PropTypes from 'prop-types';


const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = _dispatch => ({
  fiterItems: serchText => _dispatch(fiterItems(serchText)) 
});


class SearchInput extends Component {
  constructor(props){
    super(props);
    this.state =  {
      serchText:'' 
    };
    this.handleChange = this.handleChange.bind(this);
    this.keyPress     = this.keyPress.bind(this);
    this.handleClick  = this.handleClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleChange = (e) =>{ 
    this.setState({serchText:e.target.value});
  }

  keyPress(e){
    if(e.keyCode === 13){
      this.handleClick();
        
    }
 }

 handleClick(){
  if(this.state.serchText){ 
    this.context.router.history.push(`/search`);
    this.props.fiterItems(this.state.serchText);
  }
 }

  render() {
    return (
      <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
        onClick={this.handleClick}
      />
      <Input
        onChange={this.handleChange}
        onKeyDown={this.keyPress} 
        value={this.state.serchText} 
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </Form>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput); 