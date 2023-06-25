import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from 'react-query';
import { addMaincard } from '../../../../utils/actions/cartel';
import useStyles from '../style';

type Props = {
    opened: boolean;
    close: () => void;
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any[] | null | undefined, unknown>>
};

export default function AddCardModal({ opened, close, refetch }: Props) {
    const { classes, theme } = useStyles();
    const form = useForm({
        initialValues: {
            author: '',
            category: '',
            title: '',
            image: '',
            permlink: '',
        },
    });

    const addMaincardMutation = useMutation(addMaincard, {
        onSuccess: () => {
            refetch();
            close();
            form.reset();
        },
        onError: (error) => {
            console.error('Error adding maincard:', error);
        },
    });

    const handleSubmit = async (values: any) => {
        try {
            await addMaincardMutation.mutateAsync(values);
        } catch (error) {
            console.error('Error adding maincard:', error);
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add main card">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput label="Author" placeholder="Author" {...form.getInputProps('author')} />
                    <TextInput label="Category" placeholder="Category" {...form.getInputProps('category')} />
                    <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
                    <TextInput label="Image" placeholder="Image" {...form.getInputProps('image')} />
                    <TextInput label="Permlink" placeholder="Permlink" {...form.getInputProps('permlink')} />
                    <Group position="right" mt="md">
                        <Button
                            variant="outline"
                            radius="md"
                            size="sm"
                            color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                            type="submit"
                        >
                            Add card
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
