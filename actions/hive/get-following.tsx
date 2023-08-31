import apiHive from "@/utils/apiHive";
import { useQuery } from "react-query";

export const getFollowing = async (account: string): Promise<string[]> => {
    const batchSize = 100;
    let following: string[] = [];

    let start = '';

    while (true) {
        try {
            const response = await apiHive.post('https://api.hive.blog', {
                jsonrpc: '2.0',
                method: 'condenser_api.get_following',
                params: {
                    account,
                    start,
                    type: 'blog',
                    limit: batchSize,
                },
                id: 1,
            });

            const result = response.data.result;
            const fetchedAccounts = result.map((entry: any) => entry.following);

            if (fetchedAccounts.length === 0) {
                // No more accounts to fetch
                break;
            }

            following = following.concat(fetchedAccounts);
            if (following.length >= 1000) {
                // Reached the desired limit (1000 in this example)
                break;
            }

            start = fetchedAccounts[fetchedAccounts.length - 1]; // Set the start parameter for the next request
        } catch (error) {
            console.error('Error fetching following accounts:', error);
            break;
        }
    }

    return following;
};

export const useGetFollowing = (username: string) => {
    const queryFn = () => getFollowing(username);
    return useQuery(['following-data', username], queryFn, {
        refetchOnWindowFocus: false,
        retry: false,
        keepPreviousData: true,
    });
};
