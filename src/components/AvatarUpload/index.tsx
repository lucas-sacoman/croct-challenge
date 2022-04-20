import {
	ExclamationCircleIcon,
	PhotographIcon,
	XIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadedFile } from '../../types/index';
import { UploadedContainer } from '../UploadedContainer';
import styles from './styles.module.scss';

const AvatarUpload = () => {
	const [file, setFile] = useState<UploadedFile>();
	const [failedUpload, setFailedUpload] = useState<boolean>(false);

	const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
		if (acceptedFiles.length === 0) {
			setFailedUpload(true);
			return;
		}

		const uploadedFile = {
			preview: URL.createObjectURL(acceptedFiles[0]),
			content: acceptedFiles[0],
		};

		setFile(uploadedFile);
	}, []);

	const { getRootProps, getInputProps, isDragActive, isFileDialogActive } =
		useDropzone(
			!failedUpload && {
				onDrop,
				accept: 'image/*',
			}
		);

	return (
		<div
			className={clsx(styles.uploaderContainer, {
				[styles.dragActive]: isFileDialogActive || isDragActive,
				[styles.fileReject]: failedUpload,
				[styles.fileAccept]: !!file,
			})}
		>
			{/* Uploader container --------------------------------------------- */}
			{!file && !failedUpload && (
				<div className={styles.uploaderMessageContainer} {...getRootProps()}>
					<input {...getInputProps()} />

					{!file && !failedUpload && (
						<>
							<span className={styles.title}>
								<PhotographIcon width="22" color="#495567" />
								Organization Logo
							</span>

							<p className={styles.description}>
								Drop your image here or click to browse.
							</p>
						</>
					)}
				</div>
			)}

			{/* On successful upload ------------------------------------------- */}
			{file && !failedUpload && (
				<UploadedContainer setFile={() => setFile(undefined)} image={file} />
			)}

			{/* On failure upload ---------------------------------------------- */}
			{!file && failedUpload && (
				<div className={styles.failedContainer}>
					<div className={styles.failedCircle}>
						<ExclamationCircleIcon width="30" color="#ffffff" />
					</div>

					<div className={styles.failMessageContainer}>
						<span>Sorry, the upload failed.</span>

						<a {...getRootProps()}>
							Try again <input {...getInputProps()} />
						</a>
					</div>

					<XIcon
						onClick={() => {
							setFailedUpload(false);
						}}
						className={styles.xButton}
						width="20"
						color="#677489"
					/>
				</div>
			)}
		</div>
	);
};

export { AvatarUpload };
