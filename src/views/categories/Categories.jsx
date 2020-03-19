import React, { Component } from 'react'
import {
    Row,Col,Card,CardBody,ModalHeader,
    Modal,ModalBody,ModalFooter,Button
} from 'reactstrap'
import axios from 'axios'
import {BASE_URL} from '../../configs/Constants'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import {TextInput} from '../../components/FormComponents'
import {ErrorMsg} from '../../configs/StyleConstants'
import SimpleReactValidator from 'simple-react-validator';
import SweetAlert from 'react-bootstrap-sweetalert';
import FormSpinner from '../../components/FormSpinner'


class Categories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             id:"",
             description:"",
             categoryName:"",
             modal:false,
             loadedTable:true,
             alert:null,
             errors:{},
             formSubmitting:false,
             isEdit:false

        }

        this.validator = new SimpleReactValidator();
    }
  
    
    componentDidMount(){

        this.getCategories()
    }


getCategories(){

        axios.get(`${BASE_URL}/categories`)
        .then(res=>{

            this.setState({

                data:res.data.data.content,
                loadedTable:false
            })
        })
    }

getSingleCategory(id){
    axios.get(`${BASE_URL}/categories/${id}`)
    .then(res=>{

        this.setState({
            id:res.data.data.content.id,
            categoryName:res.data.data.content.name,
            description:res.data.data.content.description,
        })
    })
}

editModal= async(id)=> {

        await this.getSingleCategory(id)
        this.setState({
            isEdit:true
        })
        setTimeout(()=>{
            this.toggle()
        },500)
}

toggle=()=>{
    this.setState(prevState=>({

        modal:!prevState.modal,
        

    }))
    
    this.validator.hideMessages()
    this.resetStateData()


}

closeToggle = ()=>{

    this.setState({

        modal:false,
        isEdit:false
    })
}

noDataIndication = ()=> {

    return (

          <h3 className="text-center text-danger">No AVailable Data</h3>
    )
}


handleChange = e => {
    this.setState({
        
        [e.target.name]: e.target.value
    })
}

onSubmitFinal = (e)=> {

    e.preventDefault()
    if(this.validator.allValid())
    {
        this.onSubmit()
    }
    else
    {
        this.validator.showMessages()
        this.forceUpdate()
    }

}

onSubmit = () => {

        const Data = {

            name:this.state.categoryName,
            description:this.state.description
        }

        this.setState({
            formSubmitting:true
        })
        
        setTimeout(()=>{
            axios.post(`${BASE_URL}/categories`,Data)
            .then(res=>{
                const getAlert = () => (
                    <SweetAlert
                    confirmBtnText="Okay"
                    confirmBtnBsStyle="success"         
                    success title= {res.data.data.message}
                    onConfirm={()=>this.hideAlert()}>   
                        Category Created        
                    </SweetAlert>
                    );
                    
                    this.setState({
                        alert: getAlert(),
                        formSubmitting:false,
                        modal:false
                    });
    
            })
            .catch(err=>{
    
                    this.setState({
    
                        errors:err.response.data.errors,
                        formSubmitting:false
                    })
            })
        },1000)
}

hideAlert = ()=> {
    
    this.setState({
        alert: null,
        modal:false
        
    });

    this.getCategories()
    this.resetStateData()

}

hideAlert2 = ()=> {
    
    this.setState({
        alert: null
        
    });

}

resetStateData(){
    this.setState({
        categoryName:"",
        description:""
    })
}





render() {

        const {
            data,
            description,
            categoryName,
            loadedTable,
            formSubmitting,
            isEdit
        } = this.state


        const columns = [
            
            {
              dataField: 'id',
              text: '#',
              hidden:true
            }, 
            {
              dataField: '#',
              text: '#',
              headerStyle: (colum, colIndex) => {
                  return { width: '80px' };
                },
              formatter: (cell, row, rowIndex, extraData) => (
                 
                      <div>
                          {rowIndex+1}
                      </div>
                ),
            }, 
            {
              dataField: 'name',
              text: 'Category Name',
              headerStyle: (colum, colIndex) => {
                return { width: '300px' };
              },
            //  
            }, 
            {
              dataField: 'description',
              text: 'Description',
            }
           
            
          ];
  

        const options = {
            pageStartIndex: 1,
            showTotal:true,
            totalSize:this.state.totalSize,

            };

        const rowEvents = {

                onClick: (e, row) => {
        
                      e.preventDefault()
                    //   alert(row.id)
                    this.editModal(row.id)
                }
        
            };
    
            const rowStyle = { 
                cursor:'pointer',
            };
                            
        const closeBtn = <button className="close" onClick={this.closeToggle}>&times;</button>;
    
        return (
            <React.Fragment>
                <Row>
                    <Col md="9">
                        <h4 className="text-left">Category Display</h4>
                    </Col>
                    <Col md="3">
                        <button className="btn btn-outline-primary float-right mb-3" onClick={this.toggle}>
                            <i className="fa fa-plus"></i> New Category
                        </button>
                    </Col>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <BootstrapTable 
                                keyField="id"
                                caption={loadedTable?"":"Product Categories"}
                                data={ data }
                                columns={ columns }
                                bordered={false}
                                hover
                                pagination={ paginationFactory(options) }
                                noDataIndication={this.noDataIndication}
                                overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
                                rowStyle = {rowStyle}
                                loading={loadedTable}
                                rowEvents={rowEvents}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/*  */}
                   {/* modal start */}
               <Modal 
                isOpen={this.state.modal}
                backdrop={'static'} 
                toggle={this.toggle} 
                centered={false}
                 >
                        <ModalHeader 
                        toggle={this.toggle} 
                        close={formSubmitting?"Loading...":closeBtn}
                        cssModule={{'modal-title': 'w-100 text-center'}}
                        >
                            {isEdit?"Edit Category":"New Category"}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col md="12">
                                    <TextInput
                                        labelFor="categoryName"
                                        labelText="Category Name"
                                        type="text"
                                        name="categoryName"
                                        value={categoryName}
                                        onChange={this.handleChange}
                                    >
                                        <ErrorMsg>{this.validator.message('category name', categoryName, 'required|string')}</ErrorMsg>       
                                    </TextInput>
                                </Col>
                                <Col md="12">
                                    <TextInput
                                        labelFor="description"
                                        labelText="Description"
                                        type="textarea"
                                        name="description"
                                        value={description}
                                        onChange={this.handleChange}
                                    >
                                        <ErrorMsg>{this.validator.message('description', description, 'required')}</ErrorMsg>       
                                    </TextInput>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            {isEdit?
                            <Button
                             color="success"
                             block
                             onClick={this.onEditFinal}
                            >
                               {formSubmitting?<FormSpinner/>:" Update"}
                            </Button>
                            :
                            <Button
                             color="success"
                             block
                             onClick={this.onSubmitFinal}
                            >
                               {formSubmitting?<FormSpinner/>:" Create"}
                            </Button>
                            }
                        </ModalFooter>
                </Modal>

                {this.state.alert}
            </React.Fragment>
        )
    }
}

export default Categories
