import axios from "axios";
import { z } from "zod";

const GithubProject = z.object({
	name: z.string(),
	description: z.union([z.string(), z.null()]),
	topics: z.array(z.string()),
	html_url: z.string()
});
const GithubProjects = z.array(GithubProject);

export type GithubProject = z.infer<typeof GithubProject>;
export type GithubProjects = z.infer<typeof GithubProjects>;

export async function fetchRepos(): Promise<GithubProjects> {
	const repos: GithubProjects = [];
	let i = 1;
	while (i) {
		const res = await axios.get<GithubProjects>("https://api.github.com/users/Naerhy/repos", {
			params: {
				per_page: 100,
				page: i
			},
			timeout: 5000
		});
		GithubProjects.parse(res.data);
		if (res.data.length) {
			repos.push(...res.data);
			i++;
		} else {
			i = 0;
		}
	}
	return repos;
}
