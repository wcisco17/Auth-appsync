import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import AppSyncConfig from './aws-exports'
import { ApolloProvider } from 'react-apollo'

import Amplify, { Auth } from 'aws-amplify'
import App from './App'

Amplify.configure(AppSyncConfig)

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => 
      (await Auth.currentSession()).getIdToken().getJwtToken()
    
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
)




ReactDOM.render(
<WithProvider />, document.getElementById('root'));

