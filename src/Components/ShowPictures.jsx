
import { useDebugValue, useEffect } from 'react';
import { getAllPicturesFromserver, getPictureByCode, UppdatePicture, RemovePicture, GetAllPicturesInKategory, AddPicture } from '../Redax/Picturs/PictursThank';
import { getKategoryByCode } from '../Redax/Kategories/KategoriesThank'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { MDBNavbarLink } from 'mdb-react-ui-kit';
import OnePictureOnClik from './OnePictureOnClik';
import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';
import { store } from '../Redax/Reducers';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMenneger } from '../Redax/Users/UserAction';
import { MDBIcon } from 'mdbreact';
import { MDBCardImage, MDBCol } from 'mdbreact';
import { MDBInput } from 'mdbreact';
import { Navigate } from 'react-router';
import { uppdatePicture } from '../Redax/Picturs/PictursAction';
import { addToBasket } from '../Redax/Users/UserAction';
import { withRouter } from 'react-router-dom';
import { MDBContainer } from 'mdb-react-ui-kit';
import { MDBRow, MDBView } from 'mdbreact';
import { MDBRating } from 'mdbreact';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { getAllKategoriesFromserver } from '../Redax/Kategories/KategoriesThank';
import axios from "axios";
import { MDBFile } from 'mdb-react-ui-kit';
import { MDBTooltip } from "mdbreact";
import { getAllCountingFromserver } from '../Redax/Picturs/PictursThank';
export default withRouter(function ShowPictures(Props) {
  let k,c;

  let params = useParams();
  let [kat, setKat] = useState();
  const dispatch = useDispatch();
  let myPicturesFromServer, myAllKategories,MyCountingList;
  let myPicture, myCodeForAddPicture, myRemovePicture, myPictureOfKategory;
  const [PictureList, setPictureList] = useState([]);
  const [KategoryList, setKategoryList] = useState([]);
  const [countingList, setCountingList] = useState([]);
  const [OnePicture, setOnePicture] = useState({ codePicture: "", codeUser: "", codeKategory: "", uppDateToWeb: "", cascadingPicture: "", routeSoursePicture: "", routeGoalPicture: "",codeCounting:"" });
  const [PicturesInOneKategory, setPicturesInOneKategory] = useState([]);
  const M = useSelector((store) => { return store.users.isMenneger });
  const U = useSelector((store) => { return store.users.user });
  const [myFile, setMyfile] = useState();
  const [ n,setn]=useState();
  let c2;

 

  const validatecasCadingPicture = (event) => {
    debugger
    if (event.target.value > 0 && event.target.value < 6)
      setOnePicture({ ...OnePicture, cascadingPicture: event.target.value });
    else
      alert("???????? ???????? ??1 ???? 5 ????????!!")
  }




  debugger;


  useEffect(async () => {
    debugger;

    if (Props.match.params.codeCategory) {
      myPictureOfKategory = await GetAllPicturesInKategory(dispatch, Props.match.params.codeCategory);
      
      await setPicturesInOneKategory(myPictureOfKategory);
      await setPictureList(myPictureOfKategory);

   
    }

    else {
      debugger
      myPicturesFromServer = await getAllPicturesFromserver(dispatch);
      await setPictureList(myPicturesFromServer);
      myAllKategories = await getAllKategoriesFromserver(dispatch);
      await setKategoryList(myAllKategories);
     
      MyCountingList= await getAllCountingFromserver(dispatch);
      await setCountingList(MyCountingList);
     }
    let k = getAllKategoriesFromserver(dispatch);
    setKat(k);
    
    
  }, []);

  const addP = async (code) => {
    if (!code) {
     
      myCodeForAddPicture = await AddPicture(dispatch, U.codeUser, k, OnePicture.cascadingPicture, document.getElementById("routeGoalPicture").value,c);
     
      await setPictureList(myCodeForAddPicture);
      debugger
      alert("?????????? ???????? ????????????");
      debugger
    
    }
    else {
      let p = await getPictureByCode(dispatch, code);
      await setOnePicture(p);
    }



  }
  const uppP = async () => {

    parseInt(OnePicture.codeKategory, 10);
    parseInt(OnePicture.codeUser, 10);
    parseInt(OnePicture.cascadingPicture, 10);
    parseInt(OnePicture.codeCounting, 10);
    // parseDate(OnePicture.uppDateToWeb);
    debugger
    let u = await UppdatePicture(dispatch, OnePicture.codePicture, OnePicture.codeUser, k, OnePicture.uppDateToWeb, OnePicture.cascadingPicture,null, OnePicture.routeGoalPicture,c);
    await setPictureList(u);
    debugger
    console.log(u);

    await alert("?????????? ?????????? ????????????!");
    setOnePicture({ codePicture: "", codeUser: "", codeKategory: "", uppDateToWeb: "", cascadingPicture: "", routeSoursePicture: "", routeGoalPicture: "" });

  }
  
  const deletP = async (codeP) => {
    // const codeP = document.getElementById("PicCodeToDelete").value;
    debugger;
    try {
      myRemovePicture = await RemovePicture(dispatch, codeP);
      await setPictureList(myRemovePicture);
      alert("?????????? ???????? ????????????!");

      return
    }
    catch {
      alert("???????? ???????????? ?????????? ???????? ???? ???????? ??????????....");
    }
    document.getElementById("PicCodeToDelete").value = "";
  }

  const OnePictureDetails = (x) => {
    Props.history.push(`/onePicture/${x}`)

  }



 
  const AddGame = async () => {
    debugger
    if (myFile == null) {
      alert("???? ?????????? ????????");
    }
    else{

      debugger
      const formData = new FormData();
      formData.append('file', myFile, myFile.name);
      await axios.post("http://localhost:26064/api/PictureControler/uploadMenneger", formData, { reportProgress: true, observe: 'events' }).
        then(x => {
          console.log(x);
        })
     
      debugger

     
      //?????????? ????????????
      myCodeForAddPicture = await AddPicture(dispatch, U.codeUser, k,0 , null, myFile.name," ?????????? "+myFile.name,c);
      await setPictureList(myCodeForAddPicture);
      debugger
      alert("?????????? ???????? ????????????");
    }


  }







  const uploadFile = async(e) => {
  await  setMyfile(e.target.files[0])
  }
  const loadKategory=async(x)=>{
    c2= await getKategoryByCode(dispatch,x.codeKategory)
    setn( c2.nameKategory);
  }
  return <>

    <BrowserRouter>

      <div>

        {/* --------------------------------------?????????? ??????????  ???????????? ????????------------------------------------------------------------------------- */}
        {(M == 1) &&
          <div>
            <MDBCard  id='add' className="my-5 px-5 pb-5" style={{ margin: '10px 20%', background: 'lightsteelblue' }}>
              <MDBIcon size='3x' icon="bookmark" className='ms-1' /><MDBCardHeader>???????????????? ????????:</MDBCardHeader>
              <MDBCardBody className="text-center">
                <MDBCard alignment='center' style={{ display: 'block', maxWidth: '20rem', float: 'right', margin: "10px 1%" }}>
                  <MDBIcon size='2x' icon="plus" />
                  <MDBCardHeader>???????? ????????</MDBCardHeader>
                  <MDBCardBody>

                   



                    <label htmlFor="defaultFormEmailEx" className="grey-text font-weight-light">?????? ?????????????????? ??????????????
                     <br />
                      ?????? ???? ???????? ???????????????? 
                    </label>
                    <br></br>
           
                    <select  class="form-control"  
                    onChange={(e)=>{
                      debugger
                      k=e.target.value;}}
                    >
                   
                    {KategoryList.map((x) => (
                        <option  value={x.codeKategory} >{x.nameKategory}</option>
                      ))}
                    </select>
                   
                    <label htmlFor="defaultFormEmailEx" >?????? ?????????? ???????????? ???????????? 

                    </label>

<select  class="form-control"  onChange={(e)=>{debugger; c=e.target.value;}} >
                   {countingList.map((x) => (
                       <option  value={x.codeCounting} >{x.nameCounting}</option>
                     ))}
                   </select>

                  
                    <label htmlFor="defaultFormEmailEx" className="grey-text font-weight-light"> ?????? ???? ???????????? ??1-5</label>
                    <input type="number" id="cascadingPicture" className="form-control" value={OnePicture.cascadingPicture} onChange={(e) => validatecasCadingPicture(e)}></input>

                    {/* <label htmlFor="defaultFormEmailEx" className="grey-text font-weight-light"> <MDBFile style={{ width: "100%" }} value="- ???? ???????????????? ?????????? ????????" accept=".jpg" onChange={(event) => { UploadImage(event) }} /></label>
                    <input type="text" id="routeSoursePicture" className="form-control" value={OnePicture.routeSoursePicture} onChange={() => { setOnePicture({ ...OnePicture, routeSoursePicture: document.getElementById("routeSoursePicture").value }) }} ></input> */}
                    {/* onChange={(e) => validateRouteSoursePicture(e)} */}
                    <label htmlFor="defaultFormEmailEx" className="grey-text font-weight-light">  ???????? ?????????? ??????????</label>
                    <input type="file" id="routeGoalPicture" className="form-control"   onChange={(event) => { uploadFile(event) }}  ></input>
                    {/* <MDBBtn color="white" className="form-control">  <MDBFile style={{ width: "100%" }} accept=".jpg" onChange={(event) => { uploadFile(event) }}  />
                </MDBBtn> */}
                    {OnePicture.codePicture == "" ?
                   
                    <MDBBtn outline onClick={() => AddGame()} >????????</MDBBtn>

                      :
                      <MDBBtn outline onClick={() => uppP()} >????????</MDBBtn>}


                  </MDBCardBody>
                </MDBCard>

                <MDBCard alignment='center' style={{ display: 'block', maxWidth: '20rem', float: 'right' ,margin: "10px 1%" }}>
                  <MDBIcon size='2x' icon="minus" />
                  <MDBCardHeader>?????? ????????</MDBCardHeader>
                  <MDBCardBody>
                    <label htmlFor="defaultFormEmailEx" className="grey-text font-weight-light">
                      ???????? ?????? ?????????? ????????????
                    </label>
                    <input type="text" id="PicCodeToDelete" className="form-control"></input>
                    <MDBBtn outline onClick={() => deletP()} >??????</MDBBtn>
                  </MDBCardBody>
                </MDBCard>

              </MDBCardBody>
            </MDBCard>
          </div>
        }

        {(PictureList.length != 0) ?   
<>
        {PictureList.map((x) => (
          <MDBCard style={{ textAlign: "center", width: "22rem", float: 'right', margin: "20px 20px" }}>
            <MDBCardImage className="img-fluid" src={`http://localhost:26064/images/QuizPictures/${x.routeGoalPicture}`} style={{ height: '250px' }} waves />
            <MDBCardBody>
              {/* {loadKategory(x)} */}
              <MDBCardHeader > {[1,2,3,4,5].map((c) => (
                    // <i class="fa fa-info-circle"></i>
                    (c <= x.cascadingPicture)? <i style={{"color":"gold"}} class="fas fa-star"></i>:<i style={{"color":"gray"}} class="fas fa-star"></i>
                  ))
                  }
                  <br />
                  {(M == 1) &&
                       <p >{x.codePicture}</p>
                   }
                  <MDBIcon icon="barcode" /></MDBCardHeader>

              <MDBCardTitle >{x.namePicture}</MDBCardTitle>
             { x.codeKategory==null?
              <MDBCardText>
              ??????????????????: 
              ???? ????????
              </MDBCardText>
              :
             <> {KategoryList.map((k) => (
                        // <option  value={x.codeKategory} >{x.nameKategory}</option>
                (x.codeKategory==k.codeKategory)&&<MDBCardText>
                ??????????????????: 
                {k.nameKategory}
                </MDBCardText>
                ))}
                </>
                
               

}
              
             
              {/* <MDBCardText onClick={
                async()=>{c2= await getKategoryByCode(dispatch,x.codeKategory)
                setn( c2.nameKategory)}}>??????????????????: {n} </MDBCardText> */}

              {/* <MDBTooltip placement="top">
                        <MDBBtn color="primary" size="sm" >
                        <a style={{color:"#ffffff"}} href='/myGame.pdf' download onClick={()=>{console.log("lll"); axios.put("http://localhost:26064/api/PictureControler/cascading?"+"id="+U.codeUser,x)}}> 
                        <MDBIcon icon="angle-double-down" /></a>
                        </MDBBtn>
                        <div>??????????</div>
                      </MDBTooltip> */}

              <MDBNavbarLink><MDBBtn onClick={() => OnePictureDetails(x.codePicture)}  >?????????? ????????????</MDBBtn></MDBNavbarLink>

              {(M == 1) &&
              <>
                <MDBBtn style={{margin:"5px"}} href='#add' outline onClick={() => addP(x.codePicture)} >????????</MDBBtn>
                <MDBBtn style={{margin:"5px"}} href='#delete' outline onClick={() => deletP(x.codePicture)} >??????</MDBBtn></>}

            </MDBCardBody>
          </MDBCard>
        ))

        }</>
 :
         <>
<div class="info-msg" style={{ margin: '10px 0', padding: "10px", borderRadius: "3px 3px 3px 3px", color: "#059", backgroundColor: "lightsteelblue" }}>
          <i class="fa fa-info-circle"></i>
          ?????? ?????????? ????????????.
        </div></>} 

      </div> 

    </BrowserRouter>
  </>



})


