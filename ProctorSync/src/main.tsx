import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {RouterProvider} from "react-router-dom";
import {router} from "@/routes/routes.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import { PersistGate } from 'redux-persist/integration/react';
import {persistor, store} from "@/redux/store/store.ts";
const queryClient = new QueryClient();
import {Provider} from "react-redux";
import {Loader} from "@/components/Loader.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <RouterProvider router={router} />
                </ThemeProvider>
            </QueryClientProvider>
        </PersistGate>
    </Provider>

)
