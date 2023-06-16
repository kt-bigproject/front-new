import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import styled from '@emotion/styled';
import Icon from '@leafygreen-ui/icon';
import styles from './styles.module.css';

const CustomSideNav = styled(SideNav)`
  /* height: 100vh; */
  font-size: 30px;
`

export default function Sidebar() {

  return(
  <CustomSideNav
    // widthOverride={500}
  >
    <SideNavItem>Overview</SideNavItem>
    <SideNavItem>Introduction</SideNavItem>
    <SideNavItem>
      Android SDK
      <SideNavItem><div className={styles.name}>Install MongoDB Community Edition</div></SideNavItem>
      <SideNavGroup
        header="Fundamentals"
        collapsible
        glyph={<Icon glyph="Building" />}
      >
        <SideNavItem active>
          Upgrade MongoDB Community to MongoDB Enterprise
        </SideNavItem>
        <SideNavItem>Verify Integrity of MongoDB Packages</SideNavItem>
        <SideNavGroup header="Preferences">
          <SideNavItem>Privacy</SideNavItem>
          <SideNavItem>Security</SideNavItem>
        </SideNavGroup>
      </SideNavGroup>
    </SideNavItem>
  </CustomSideNav>
);
}