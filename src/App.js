import { BrowserRouter } from 'react-router-dom';
import { Layout, Image } from 'antd';
import RestaurantContextProvider from './contexts/RestaurantContext';
import AppRoutes from './components/AppRoutes';
import SideMenu from '../src/components/SideMenu';
import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
const { Sider, Content, Footer } = Layout;

Amplify.configure(awsconfig)

function App() {
  return (
    <RestaurantContextProvider>
      <BrowserRouter>
        <Layout>
          <Sider style={{ height: "100vh", backgroundColor: 'white' }}>
            <Image
              src="https://logos-world.net/wp-content/uploads/2020/11/Uber-Eats-Symbol.jpg"
              preview={false}
            />

            <SideMenu />
          </Sider>
          <Layout>
            <Content>
              <AppRoutes />
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Uber Eats Restaurant Dashboard Clone
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </RestaurantContextProvider>
  );
}

export default withAuthenticator(App);
