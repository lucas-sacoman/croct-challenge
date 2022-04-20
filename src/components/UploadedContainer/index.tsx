import { XIcon } from '@heroicons/react/solid';
import { FormEvent, useState } from 'react';
import Cropper from 'react-easy-crop';
import { PuffLoader } from 'react-spinners';
import { UploadedFile } from '../../types';
import getCroppedImg from '../../utils/cropImage';
import styles from './styles.module.scss';

interface UploadedContainerProps {
	image: UploadedFile;
	setFile: React.Dispatch<React.SetStateAction<UploadedFile>>;
}

interface CroppedArea {
	height: number;
	width: number;
	x: number;
	y: number;
}

const UploadedContainer = ({ image, setFile }: UploadedContainerProps) => {
	const [saveImage, setSaveImage] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [croppedImage, setCroppedImage] = useState('');
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [croppedAreaPixels, setCroppedAreaPixels] =
		useState<CroppedArea>(Object);

	const cropComplete = (croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const zoomPercent = (zoom: number) => {
		return `${Math.floor(zoom * 10)} %`;
	};

	const rotationPercent = (rotation: number) => {
		return `${Math.floor(rotation / 3.6)} %`;
	};

	const onSubmitImage = async (e: FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			const { url } = await getCroppedImg(
				image.preview,
				croppedAreaPixels,
				rotate
			);

			setCroppedImage(url);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}

		setSaveImage(true);
	};

	return (
		<div className={styles.UploadedContainer}>
			{loading ? (
				<div className={styles.loaderContainer}>
					<PuffLoader color="#3d485f" loading={loading} size={40} />
				</div>
			) : (
				<>
					<div
						className={styles.imageCircle}
						style={{
							backgroundImage: saveImage && `url('${croppedImage}')`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundColor: '#ffffff',
						}}
					>
						{!saveImage && (
							<Cropper
								cropShape="round"
								image={image.preview}
								objectFit="contain"
								crop={crop}
								zoom={zoom}
								rotation={rotate}
								cropSize={{ width: 160, height: 160 }}
								showGrid={false}
								aspect={1}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onRotationChange={setRotate}
								onCropComplete={cropComplete}
							/>
						)}
					</div>

					{!saveImage && (
						<>
							<form
								onSubmit={(e) => onSubmitImage(e)}
								className={styles.cropContainer}
							>
								<span>Crop</span>
								<label htmlFor="zoom">Zoom: {zoomPercent(zoom)}</label>

								<input
									type="range"
									name="zoom"
									id="zoom"
									min={1}
									max={10}
									step={0.1}
									value={zoom}
									onChange={(e) => setZoom(e.target.valueAsNumber)}
								/>

								<label htmlFor="rotate">
									Rotation: {rotationPercent(rotate)}
								</label>
								<input
									id="rotate"
									type="range"
									min={0}
									max={360}
									step={1}
									value={rotate}
									onChange={(e) => setRotate(e.target.valueAsNumber)}
								/>

								<div className={styles.buttonContainer}>
									<button type="submit">Save</button>
								</div>
							</form>

							<XIcon
								onClick={() => {
									setFile(undefined);
								}}
								className={styles.xButton}
								width="20"
								color="#677489"
							/>
						</>
					)}
				</>
			)}

			{saveImage && (
				<div className={styles.successfulContainer}>
					<span className={styles.successfulMessage}>Successful!</span>

					<a
						onClick={() => setFile(undefined)}
						className={styles.addAnotherImage}
					>
						Add another image
					</a>
				</div>
			)}
		</div>
	);
};

export { UploadedContainer };
