

import { dotSpinner } from 'ldrs'

dotSpinner.register()




export const Loader = () => {
	return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<l-dot-spinner
			size="60"
			speed="0.9"
			color="#3d61ff"
		></l-dot-spinner>
	</div>


}