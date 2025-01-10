import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import BaseLayout from './pages/Layout/BaseLayout.tsx'
import SkuHideList from './pages/SkuHideList.tsx'
import SkuHideUnhiddenUpload from './pages/SkuHideUnhiddenUpload.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: BaseLayout,
                children: [
                    {
                        path: '/inventory-hide',
                        Component: SkuHideList,
                    },
                    {
                        path: '/inventory-hide/list',
                        Component: SkuHideList,
                    },
                    {
                        path: '/inventory-hide/upload',
                        Component: SkuHideUnhiddenUpload,
                    },
                ],
            },
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
