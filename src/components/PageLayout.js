import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Content = styled.main`
    /* max-width: 800px; */
    /* margin: 0; */
    padding: 0 16px;
    box-sizing: border-box;
    font-family: 'Open Sans';
    h1, h2, h3, h4, h5, h6{
        font-family: 'Kaushan Script';
        
    }
`;

const Section = styled.section`
  box-shadow: 0 0 5px #ccc;
  padding: 0 10px;
  max-width: 1200px;
  width: 100%;
  height: 80%;
  margin: 0 auto;
`
export function PageLayout({children}) {
    return (
        <>
            <Navbar />
            <Section>
            <Content>
{children}
            </Content>
            </Section>

            </>
    )
}