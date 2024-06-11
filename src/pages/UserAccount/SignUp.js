import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppContainer from '../../components/AppContainer';
import NavigationBar from '../../components/Nav/NavigationBar';
import ContentContainer from '../../components/ContentContainer';
import PurpleButton from '../../components/button/PurpleButton';
import { Title } from "../../components/Typography";
import { ButtonWrapper } from "../../components/button/ButtonWrapper";
import { apiClient } from "../../api/apiClient";
import axios from 'axios';

const Input = styled.input`
  width: 100%;
  height: 27px;
  font-size: 16px;
  border-radius: 10px;
  background-color: #F2F2F2;
  border: 0;
`;

const CheckInput = styled.input`
  background-color: #F2F2F2;
  width: 27px;
  height: 27px;
  font-size: 16px;
`;

function SignUp() {
    const [data, setData] = useState({ email: '', name: '', phoneNumber: '', password: '', confirmPassword: '', weddingRole: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (role) => {
        setData({
            ...data, weddingRole: data.weddingRole === role ? '' : role
        });
    };

    const checkPasswordsMatch = () => {
        if (data.password !== data.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!checkPasswordsMatch()) return;

        const endpoint = data.weddingRole === 'GUEST' ? '/auth/guest/sign-up' : '/auth/wedding-user/sign-up';
        axios.post(endpoint, {
            email: data.email,
            name: data.name,
            phoneNumber: data.phoneNumber,
            password: data.password,
            weddingRole: data.weddingRole
        }, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data);
            alert("환영합니다!");
            navigate('/loginform');
        })
        .catch((error) => {
            if (error.response) {
              if (error.status === 403) {
                alert("주문 권한이 없습니다.");
              } else {
                alert("주문이 실패했습니다. " + error.response.data.message);
              }
            }
          });
    }
       {/* if (data.weddingRole === 'GUEST') {
            console.log(data.weddingRole);
            apiClient.post('/auth/guest/sign-up', {
                email: data.email,
                name: data.name,
                phoneNumber: data.phoneNumber,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);
                alert("환영합니다!");
                navigate('/loginform');
            })
            .catch((error) => {
                if (error.response) {
                  if (error.status === 403) {
                    alert("주문 권한이 없습니다.");
                  } else {
                    alert("주문이 실패했습니다. " + error.response.data.message);
                  }
                }
              });
        }
        else {
            apiClient.post('/auth/wedding-user/sign-up', {
                email: data.email,
                name: data.name,
                phoneNumber: data.phoneNumber,
                password: data.password,
                weddingRole: data.weddingRole
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);
                alert("환영합니다!");
                navigate('/loginform');
            })
            .catch((error) => {
                if (error.response) {
                  if (error.status === 403) {
                    alert("주문 권한이 없습니다.");
                  } else {
                    alert("주문이 실패했습니다. " + error.response.data.message);
                  }
                }
              });
        }

    };
    */}

    return (
        <AppContainer>
            <NavigationBar />
            <ContentContainer>
                <form>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Title>회원가입</Title>
                    </div>
                    <div>
                        <h4 style={{ marginTop: '30px', marginBottom: '4px' }}>이메일</h4>
                        <Input name="email" type="email" value={data.email} onChange={handleChange} />
                        <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>이름</h4>
                        <Input name="name" type="text" value={data.name} onChange={handleChange} />
                        <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>전화번호</h4>
                        <Input name="phoneNumber" type="text" value={data.phoneNumber} onChange={handleChange} />
                        <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호</h4>
                        <Input name="password" type="password" value={data.password} onChange={handleChange} />
                        <h4 style={{ marginTop: '20px', marginBottom: '4px' }}>비밀번호 확인</h4>
                        <Input name="confirmPassword" type="password" value={data.confirmPassword} onChange={handleChange} />
                    </div>
                    <div style={{ display: 'flex', marginTop: '40px' }}>
                        <div style={{ width: '33%' }}>
                            <label>
                                <CheckInput type="checkbox" checked={data.weddingRole === 'GROOM'} onChange={() => handleRoleChange('GROOM')} />
                                신랑
                            </label>
                        </div>
                        <div style={{ width: '33%' }}>
                            <label>
                                <CheckInput type="checkbox" checked={data.weddingRole === 'BRIDE'} onChange={() => handleRoleChange('BRIDE')} />
                                신부
                            </label>
                        </div>
                        <div style={{ width: '33%' }}>
                            <label>
                                <CheckInput type="checkbox" checked={data.weddingRole === 'GUEST'} onChange={() => handleRoleChange('GUEST')} />
                                하객
                            </label>
                        </div>
                    </div>
                    <div style={{ position: 'fixed', bottom: '24px', width: '300px' }}>
                        <ButtonWrapper>
                            <PurpleButton as="button" type="submit" onSubmit={handleSignUp}>회원가입하기</PurpleButton>
                        </ButtonWrapper>
                    </div>
                </form>
            </ContentContainer>
        </AppContainer>
    );
}

export default SignUp;
