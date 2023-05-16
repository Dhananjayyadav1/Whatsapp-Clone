import React from 'react';
import { useContext } from 'react';
import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';
import jwt_decode from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';
import { addUser } from '../../service/api';


const dialogStyle = {
  marginTop: '12%',
  height: '96%',
  width: '65%',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: 0,
  boxShadow: 'none',
  overflow: 'hidden'
}

const QRCOde = styled('img')({
  margin: '50px 0 0 50px',
  height: 264,
  width: 264
});

const Component = styled(Box)`
    display: flex; 
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const Title = styled(Typography)`
    font-size: 26px;
    margin-bottom: 25px;
    color: #525252;
    font-family: inherit;
    font-weight: 300;
`;

const StyledList = styled(List)`
    &  > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: #4a4a4a;
    }
`;

const LoginStyle = styled(Box)`
position: absolute;
top: 50%;
transform: translateX(25%) translateY(-25%);
`

const LoginDialog = () => {

  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    let decoded = jwt_decode(res.credential);
    setAccount(decoded);
    await addUser(decoded);
  }

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  return (
    <Dialog
      open={true}
      hideBackdrop={true}
      maxWidth={'md'}
      PaperProps={{ sx: dialogStyle }}
    >
      <Component>
        <Container>
          <Title>To use WhatsApp on your computer:</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu or Settings and Linked Devices</ListItem>
            <ListItem>3. Tap on Link a Device</ListItem>
            <ListItem>4. Point your phone to this screen to capture the code</ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: 'relative' }}>
          <QRCOde src={qrCodeImage} alt="" />
          <LoginStyle>
            <GoogleLogin
              onSuccess={onLoginSuccess}
              onError={onLoginFailure} 
            />
          </LoginStyle>
        </Box>
      </Component>
    </Dialog>
  )
}

export default LoginDialog;