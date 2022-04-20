import { PhotographIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './styles.module.scss';

const AvatarUpload = () => {
	const onDrop = useCallback(<T extends File>(acceptedFiles: T[]) => {
		console.log(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragAccept, isDragReject } =
		useDropzone({
			onDrop,
			accept: 'image/*',
		});

	return (
		<div
			className={clsx(styles.uploaderContainer, {
				[styles.dragAccept]: isDragAccept,
				[styles.dragReject]: isDragReject,
			})}
			{...getRootProps()}
		>
			<span className={styles.title}>
				<PhotographIcon width="22" color="#495567" />
				Organization Logo
			</span>

			<p className={styles.description}>
				Drop your image here or click to browse.
			</p>

			<input {...getInputProps()} />
		</div>
	);
};

export { AvatarUpload };
