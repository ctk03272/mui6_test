import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Outlet } from 'react-router-dom'
import HollowAppTitle from '../../components/HollowAppTitle.tsx'
import HollowPageContainer from '../../components/HollowPageContainer.tsx'
import HollowSideBarFooter from '../../components/HollowSideBarFooter.tsx'
import HollowPageHeader from '../../components/HollowPageHeader.tsx'
import SkuHideHome from '../SkuHideHome.tsx'
import { useActivePage } from '@toolpad/core/useActivePage'

export default function BaseLayout() {
    const activePage = useActivePage()

    return (
        <DashboardLayout
            disableCollapsibleSidebar
            slots={{
                sidebarFooter: HollowSideBarFooter,
                appTitle: HollowAppTitle,
            }}
        >
            <HollowPageContainer
                slots={{
                    header: HollowPageHeader,
                }}
            >
                <Outlet />
                {activePage == null && <SkuHideHome />}
            </HollowPageContainer>
        </DashboardLayout>
    )
}
