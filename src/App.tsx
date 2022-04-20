import { AvatarUpload } from './components/AvatarUpload';
import styles from './home.module.scss';

function App() {
	return (
		<main className={styles.mainContainer}>
			<header className={styles.logoContainer}>
				<h1>Avatar Uploader</h1>
			</header>

			<section className={styles.uploaderSection}>
				<AvatarUpload />
			</section>
		</main>
	);
}

export default App;
