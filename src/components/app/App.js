import { lazy, Suspense } from "react";
import CharacterDetails from "../CharacterDetails"

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import("../../pages/MainPage"));
const ComicsPage = lazy(() => import("../../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../../pages/SingleComicPage"));
const Page404 = lazy(() => import("../../pages/404"));

export default function App() {
  return (
		<div className='app'>
			<BrowserRouter>
				<AppHeader />
				<main>
					<Suspense fallback={<h1>Loading</h1>}>
						<Routes>
							<Route path='/' element={<MainPage />} />
							<Route path='/comics/' element={<ComicsPage />} />
							<Route path='/comics/:id' element={<SingleComicPage />} />
						
							<Route path='/character/:id' element={<CharacterDetails />} />
							<Route path='*' element={<Page404 />} />
						</Routes>
					</Suspense>
				</main>
			</BrowserRouter>
		</div>
	)
}