import * as React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import { askAsync } from 'expo-permissions'

export default class BookTransaction extends React.Component{
    constructor(){
        super()
            this.state={
                hascamerapermission:null,
                scanned:false,
                scanneddata:'',
                buttonstate:"normal"
    }
        
    }
getCameraPermissions=async()=>{
    const{status}=Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hascamerapermission:status==="granted",
        buttonstate:"clicked"
    })
    
}

initiateScan=async({type,data})=>{
this.setState({
    scanned:true,
    scanneddata:data,
    buttonstate:"normal"
    
})
}

render(){
    const hascamerapermissions=this.state.hascamerapermission
    const scanned=this.state.scanned
    const buttonstate=this.state.buttonstate
    
if(buttonstate==="clicked"&& hascamerapermissions){
 
    return (
        
        <BarCodeScanner onBarCodeScanned={scanned?undefined:this.initiateScan()}>  </BarCodeScanner>
    )

}
else if(buttonstate==="normal"){
    {console.log("insidesscanning")}
    return(
        <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Text>
           { hascamerapermissions===true?this.state.scanneddata:"App needs permissions to work"}
            </Text>
            <TouchableOpacity style={styles.buttonstyle}   onPress={this.getCameraPermissions}><Text style={styles.textstyle}> Scan QR code</Text></TouchableOpacity>
    
        </View>
    )
    
    }
}



}
const styles =StyleSheet.create({
    textstyle: {fontSize:15,color:"white"},
    buttonstyle: {backgroundColor:"black"}
})