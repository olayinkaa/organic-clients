import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom'
import axios from 'axios';
import TopHeader from '../../components/TopHeader'
import { BASE_URL,HEADER_FOR_GET} from '../../configs/Constants';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import overlayFactory from 'react-bootstrap-table2-overlay';
import MyLoader from '../../configs/MyLoader'



const { SearchBar } = Search;

const columns = [
  {
      dataField: "id",
      text: "ID",
      // headerAlign: 'center'
      hidden: true,
     
      footer:'ID',
      
    
      
 },
  {
      dataField: "",
      text: "ID",
      footer:'ID',
      formatter:(cellcontent,row,rowIndex)=> {

            if(row.id){
              return rowIndex+1
            }
      }

      
    
      
 },
 {
      dataField: "merchantName",
      text: "Merchant Name",
      footer:'Merchant Name',

    
     
  },
  {
      dataField: "relationshipManager",
      text: "Relationship Manager",
      footer:'Relationship Manager'

  },
 {
      dataField: "merchantCategoryId",
      text: "Category ID",
      footer:'Category ID'

 },
 {
      dataField: "merchantEmail",
      text: "Merchant Email",
      footer:'Merchant Email'

     
  },
  {
      dataField: 'status',
      text:'Status',
      footer:'Status',
      formatter:(cellcontent,row,rowIndex)=> {

        if(row.status==0)
        {
          return <h6 className="text-danger font-weight-bolderr">DISABLE</h6>
        }
        else if(row.status==1)
        {
          return <h6 className="text-success font-weight-bolder">ENABLE</h6>
        }
        else
        {
          return <h6 className="text-warning">PENDING</h6>

        }
  }


      
  }
]

const captionStyle = { 
    borderRadius: '0.25em', 
    textAlign: 'center', 
    // color: '#fb9678', 
    // border: '1px solid black', 
    padding: '0.5em' 
  }

const CaptionElement = () => <h3 style={captionStyle}>List of merchants</h3>;


const RemoteAll = ({ data,options,rowEvents,rowStyle,noDataIndication,loadedTable}) => (
  <div>
              
          <ToolkitProvider
            keyField="id"
            data={ data }
            columns={ columns }
            search
            
          >
            {
              props => (
                <div>
                  {/* <MySearch
                    { ...props.searchProps }
                  /> */}
                  {/* <hr /> */}
                  <BootstrapTable
                   { ...props.baseProps }
                      remote
                      
                      // onTableChange={ onTableChange }
                      // onDataSizeChange = {onDataSizeChange}
                      loading={loadedTable}
                      pagination={ paginationFactory(options) }
                      tabIndexCell={true}
                      bordered={false}
                      condensed={false}
                      // caption={<CaptionElement/>}
                      overlay={ overlayFactory({ spinner: true }) }
                      rowEvents={rowEvents}
                      rowStyle={rowStyle}
                      noDataIndication={noDataIndication}
                      // headerClasses="text-primary"
                    />
                </div>
              )
            }
          </ToolkitProvider>
  </div>
);



class MySearch extends React.Component{

  handleClick = () => {
      
      // if(this.refs.searchInput.value.length>2)
      // {
      //   setTimeout(()=>{

      //     this.props.handleTableChange(this.refs.searchInput.value)

      //   },1500)
      // }
      // else 
      // {
      //     this.props.fetchData()
      // }
      
        setTimeout(()=>{

          this.props.handleTableChange(this.refs.searchInput.value)

        },1000)
     
      
      
  };

  render(){

      return (
          <>
              <div className="mb-4">
                  <h4>Search:</h4>
                  <input
                  className="form-control mr-2 d-inline-block"
                  style={ { backgroundColor: 'white',width:'20%' } }
                  ref={ 'searchInput'}
                  type="text"
                  placeholder=""
                  autoFocus
                  // onKeyUp={ this.handleClick }
                  />
                  <button 
                    className="btn btn-primary " 
                    onClick={ this.handleClick }
                    >
                      Search
                  </button>
              </div>
          </>
      );
  }
};



class MerchantsList extends Component {

  
  constructor(props) {
    super(props);

    this.state = {
      
      keycloak: null,
      authenticated: false,
      isLoading: true,
      data: [],      
      currPage: null,
      loadedTable:true,
      size: 10,
      page: 0,
      count: 100,
      totalSize:null,
      hideSizePerPage:false



    }

    this.handleTableChange = this.handleTableChange.bind(this);

  }

  componentDidMount() {

       this.fetchData()
  
  }

fetchData = () => {
    axios.get(`${BASE_URL}/api/v1/ims/merchant?status=ALL`,
      {
        headers: HEADER_FOR_GET
      })
    .then(response => {

      this.setState({ ...this.state, 
        // isLoading: false, 
        sizePerPage: response.data.data.size, 
        totalSize: response.data.data.totalElements, 
        data: response.data.data.content,
        hideSizePerPage:false,
        loadedTable:false,
        isLoading:false
      
      });
      
    })
    .catch(error => {
      console.log(error);
      // this.setState({ isLoading: false })
    });

  }

 

handleDataChange = ({ dataSize }) => {


    axios.get(`${BASE_URL}/api/v1/ims/merchant?status=ALL&merchantNameLike=${dataSize}`)
    .then(res=>{

      this.setState({

          data:res.data.data.content,
          totalSize:res.data.data.totalElements,
          loadedTable:false
          
      })

  })


  }
     
  
  
handleTableChange = (filter) => {
    // const currentIndex = (page - 1) * sizePerPage;

        if(filter===''){

          axios.get(`${BASE_URL}/api/v1/ims/merchant?status=ALL`)
          .then(res=>{
  
             this.setState({
  
                data:res.data.data.content,
                totalSize:res.data.data.totalElements,
                size:res.data.data.size,
                hideSizePerPage:false,
                loadedTable:false
                // page:res.data.data.number,
  
  
             })
  
          })
        }
        else
        {
          axios.get(`${BASE_URL}/api/v1/ims/merchant?status=ALL&merchantNameLike=${filter}`)
          .then(res=>{
  
             this.setState({
  
                data:res.data.data.content,
                totalSize:res.data.data.totalElements,
                hideSizePerPage:true

                // page:res.data.data.number,
  
  
             })
  
          })
        }
     

        
  }


noDataIndication = ()=> {

    return (

          <h3 className="text-center text-danger">No AVailable Data</h3>
    )
}


singleMerchantPage = (id)=> {

    this.props.history.push(`/merchant/profile/${id}`)
}


// -----------------------------------------------------------------------------------------------------------------------------

  render() {

  
    const options = {
      onSizePerPageChange: (sizePerPage) => {
      
              
          axios.get(`${BASE_URL}/api/v1/ims/merchant?status=ALL&size=${sizePerPage}`)
          .then(res=>{

            this.setState({

                data:res.data.data.content,
                page:res.data.data.number,
                totalSize:res.data.data.totalElements
            })

          })

      },

      onPageChange: (page, sizePerPage) => {
      
            
          axios.get(`${BASE_URL}/api/v1/ims/merchant?status=ALL&page=${page}`)
          .then(res=>{

            this.setState({

                data:res.data.data.content,
                page:res.data.data.number,
                size:res.data.data.size,
                totalSize:res.data.data.totalElements


            })

          })

      },
      showTotal:true,
      hideSizePerPage: this.state.hideSizePerPage, 
      hidePageListOnlyOnePage: true,
      totalSize:this.state.totalSize,
      prePageText: 'Back',
      nextPageText: 'Next',
      sizePerPageList: [
        { text: '25', value: 25 }, 
        { text: '50', value: 50 }, 
        { text: '100', value: 100 }, 
        { text: '150', value: 150 }, 
        { text: 'All', value: this.state.totalSize }] 

    };

    const rowEvents = {

        onClick: (e, row) => {

              e.preventDefault()
              this.singleMerchantPage(row.id)
        }

    };

  const rowStyle = { 

        cursor:'pointer',
        
      
      };



  const {data,size,loadedTable,isLoading} = this.state

    return (

        <>
            <TopHeader title="Manage Merchants" breadcrum="merchants" href="merchant" >
                      <Link to='/merchant/addmerchant'  className="btn btn-info d-none d-lg-block m-l-15"><i className="fa fa-plus-circle"></i> Create Merchant</Link>        
              </TopHeader>
              {isLoading ? <MyLoader  msg="Please wait..." />
              
                          :

                  <div style={{position: 'relative', zIndex: '2'}}>
                  <div className="card">
                    <div className="card-body shadow">
                    <MySearch
                    
                      handleTableChange={this.handleTableChange}
                      fetchData={this.fetchData}
                      noDataIndication={this.noDataIndication}
                    />
                    <RemoteAll
                          data={ data }
                          sizePerPage={ size }
                          onTableChange={ this.handleTableChange }
                          onDataSizeChange={ this.handleDataChange }
                          options={options}
                          rowEvents={rowEvents}
                          rowStyle={rowStyle}
                          noDataIndication={this.noDataIndication}
                          loadedTable={loadedTable}
                        />
    
                    </div>
                  </div>
    
                </div>
            
              }
        </>
     
    );

  }
}



export default MerchantsList
