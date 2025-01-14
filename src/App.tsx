import { AppProvider } from '@toolpad/core/react-router-dom'
import { Branding, Navigation, Session } from '@toolpad/core/AppProvider'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import { extendTheme } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import BoltIcon from '@mui/icons-material/Bolt'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const navigation: Navigation = [
    {
        kind: 'header',
        title: 'Hiding',
    },
    {
        segment: 'inventory-hide',
        title: 'Inventory Hide',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'list',
                title: 'Sku Hide List',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'upload',
                title: 'SKU Hide UnHide Upload',
                icon: <DescriptionIcon />,
            },
        ],
    },
]

const branding: Branding = {
    logo: (
        <div>
            <BoltIcon />
        </div>
    ),
    title: 'SCM Inventory Planning',
    homeUrl: '/toolpad/core/introduction',
}
const hollowTheme = extendTheme({
    colorSchemes: { light: true, dark: false },
    colorSchemeSelector: 'class',
})

function App() {
    const [session, setSession] = React.useState<Session | null>({
        user: {
            name: 'Bharat Kashyap',
        },
    })

    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Bharat Kashyap',
                    },
                })
            },
            signOut: () => {
                setSession(null)
            },
        }
    }, [])

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <AppProvider
                session={session}
                authentication={authentication}
                navigation={navigation}
                theme={hollowTheme}
                branding={branding}
            >
                <Outlet />
            </AppProvider>
        </QueryClientProvider>
    )
}

export default App
