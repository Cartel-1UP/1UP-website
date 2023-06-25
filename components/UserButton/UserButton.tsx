'use client'

import { Avatar, Badge, Group, Text, UnstyledButton } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { forwardRef } from 'react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
  mana: number;
  reputation: number
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, mana, reputation, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
          color: theme.colorScheme !== 'dark' ? theme.colors.gray[4] : theme.black,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#06272e',
        },

        [theme.fn.smallerThan('xs')]: {
          display: 'none',
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name} <Badge sx={(theme) => ({ padding: 5 })} ml={5} radius="sm" color="gray" variant="outline">{reputation.toFixed()}</Badge>
          </Text>

          {/* <Progress mt={5} radius="md" size="md"
                sections={[
                  { value: mana , color: 'pink', label: '', tooltip: 'RC: ' + mana + '%'},
                ]}/> */}
        </div>
        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

export { UserButton };

