import { Title } from '@/components/pages/title/title.page';
import { IAnime } from '@/interfaces';
import { MainLayout } from '@/layouts/main/main.layout';
import anilibriaService from '@/services/anilibria.service';
import { GetServerSideProps, NextPage } from 'next';

interface ITitlePage {
	titleData: IAnime;
}

const TitlePage: NextPage<ITitlePage> = ({ titleData }) => {
	console.log(titleData);

	return (
		<MainLayout>
			<Title titleData={titleData} />
		</MainLayout>
	);
};

export default TitlePage;

interface ParsedUrlQuery {}

export const getServerSideProps: GetServerSideProps<ITitlePage> = async ({ params }) => {
	if (!params || !params?.title_code) return { notFound: true };

	try {
		const title_code: string = params.title_code as string;

		// get title by id
		const { data } = await anilibriaService.getTitle(title_code);

		return {
			props: {
				titleData: data,
			},
		};
	} catch {
		return { notFound: true };
	}
};
