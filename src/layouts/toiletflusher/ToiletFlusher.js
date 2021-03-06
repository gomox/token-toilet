import React, { Component } from 'react'
import {FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import getWeb3 from '../../util/web3/getWeb3'
import ERC721 from '../../../build/contracts/ERC721Basic.json'
import ERC20 from '../../../build/contracts/ERC20Basic.json'
import {Link} from 'react-router'
import { MainContainer, BrownContainer, Title, RegularText, TTButton, FlexColumnContainer, Spinner } from '../../styles';



class ToiletFlusher extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      quantity: "enter value",
      tokenType: "erc20",
      web3: null,
      step:"start"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {

    getWeb3
    .then(results => {
      this.setState({
        web3: results.payload.web3Instance
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

  }


  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(){
    this.setState({step:'loading'});

    setTimeout(() => {
      this.setState({step:'success'});
    }, 3000)

    /*if(this.state.tokenType === "erc20"){
      const contract = new this.state.web3.eth.Contract( ERC20.abi, contract);
      contract.methods.approve( address,this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {
          this.setState({step:'success'});
        });

    } else if(this.state.tokenType === "erc721"){
      const contract = new this.state.web3.eth.Contract( ERC721.abi, contract);
      contract.methods.approve(address, this.state.quantity).send({from: this.props.accounts[0]})
        .then(receipt => {
          this.setState({step:'success'});
        });
    }*/
  }

  render() {
    let body;
    if(this.state.step === 'start'){
      body = (
        <form style={{height:'100%', margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <RegularText style={{textAlign:'center'}}>Great! Your browser is <Link href="https://www.reddit.com/r/ethereum/comments/87wx66/growing_list_of_web3_mobile_browsers/">Web3</Link> enabled. What are you dumping?</RegularText>
          <FormGroup>
          <ControlLabel>Token Type</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} name="tokenType" label="token type">
            <option value="erc20">ERC20</option>
            <option value="erc721">ERC721</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
        <ControlLabel>Token</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleChange} name="tokenName" label="token">
            <option value="select">select token</option>
            <option value="erc20">alkj</option>
            <option value="erc721">adfadf</option>
          </FormControl>
        </FormGroup>
        <FormGroup>
          {this.state.tokenType === "erc20" ? <ControlLabel>Quantity</ControlLabel> : <ControlLabel>Asset Id</ControlLabel>}
          <FormControl
            type="text"
            name="quantity"
            value={this.state.quantity}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
        </FormGroup>
        <TTButton onClick={this.handleSubmit} style={{marginTop:'10px', alignSelf: 'center'}}> Flush That Sh*t</TTButton>
        {/* <RegularText style={{marginTop:'10px', alignSelf: 'center'}}><Link>or throw directly from your wallet</Link></RegularText> */}

      </form>
      )
    } else if (this.state.step === "loading"){
      body = (
        <FlexColumnContainer>
          <Title style={{fontFamily: 'sans-serif'}}>Flushing...</Title>
          <Spinner><img src="/assets/images/flush.svg"  style={{height: '30vh'}}></img></Spinner>
        </FlexColumnContainer>
      )
    } else if (this.state.step === "success"){
      body = (
        <FlexColumnContainer>
          <img src="/assets/images/toilet-paper.png"  style={{height: '30vh'}}></img>
          <Title style={{fontFamily: 'sans-serif', fontSize:'32px', margin:'30px 0'}}>Thanks for Flushing!</Title>
          <div>
            <RegularText style={{marginBottom: '0px'}}>How about:</RegularText>
            <ul>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> <Link to="/toilet">Flushing some more stuff</Link></RegularText></li>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> Throw some DAI in the <Link  to="/fountain">Fountain</Link></RegularText></li>
              <li style={{marginBottom: '0px'}}><RegularText><span style={{margin: '0 5px'}}>-</span> <Link to="/sprinkler">Learning more about this project</Link></RegularText></li>
            </ul>
          </div>
        </FlexColumnContainer>
      )
    }

    return(
      <MainContainer>
        <BrownContainer style={{flex:'1', justifyContent: 'space-evenly'}}>
          <Title style={{textAlign:'center'}}>Dump Some Tokens</Title>
          <RegularText style={{textAlign:'center'}}>ERC-20 or ERC-721</RegularText>
        </BrownContainer>
        <FlexColumnContainer style={{flex:'4', padding: '20px', width:'100%'}}>
          {body}
        </FlexColumnContainer>
      </MainContainer>
    )
  }
}

export default ToiletFlusher
