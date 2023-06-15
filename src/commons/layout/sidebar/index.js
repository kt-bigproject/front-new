import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  EditOutlined,
  VideoCameraOutlined,
  HighlightOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import styled from '@emotion/styled';

const { Header, Sider, Content } = Layout;

const StyledSider = styled(Sider)`
&.ant-layout-sider-collapsed {
  flex: 0 0 100px !important;
  max-width: 100px !important;
  min-width: 100px !important;
  width: 100px !important;
}
&.ant-layout-sider-collapsed .ant-menu-item {
  height: 70px;
  padding-left: 30px;
}
`;
const StyledMenu = styled(Menu)`
&.ant-menu-inline .ant-menu-item {
  height: 70px;
}
&.ant-menu-light .ant-menu-item-selected {
  color: #E57C23;
  background-color: #FFEEBB;
}
[role="menuitem"] {
  padding-left: 30px !important;
}
`;

export default function Sidebar() {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return(
    <StyledSider style={{ background: colorBgContainer, boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)'}} width={256} trigger={null} collapsible collapsed={collapsed}>
    <div style={{height: '250px'}}>
      <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '30px'}} /> : <MenuFoldOutlined style={{ fontSize: '30px'}}/>}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: 64,
            height: 64,
          }}
      />
      {
        collapsed 
        ? null
        : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Google_Colaboratory_SVG_Logo.svg/2560px-Google_Colaboratory_SVG_Logo.svg.png" width={250} height={154}/>        
      }
    </div>

      <StyledMenu                 
        style={{ color:"#5f6368", fontSize: 17 }}
        theme="light"
        mode="inline"
        // defaultSelectedKeys={['1']}
        
        items={[
          {
            key: '1',
            icon: <EditOutlined style={{ fontSize: '30px'}}/>,
            label: '핸드 라이팅 연습',                
          },
          {
            key: '2',
            icon: <VideoCameraOutlined style={{ fontSize: '30px'}} />,
            label: '단어 맞추기',
          },
          {
            key: '3',
            icon: <UploadOutlined style={{ fontSize: '30px'}}/>,
            label: '시그니처 핸드라이팅',
          },
          {
            key: '4',
            icon: <HighlightOutlined style={{ fontSize: '30px'}}/>,
            label: '랜덤 펜팔',
          },
          {
            key: '5',
            icon: <AlignLeftOutlined style={{ fontSize: '30px'}}/>,
            label: 'test',
          },
        ]}
      />
  </StyledSider>
  )
}