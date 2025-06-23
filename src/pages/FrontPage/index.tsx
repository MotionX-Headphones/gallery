import { Page } from '@/components/Page';
import { Cell, List, Section } from '@telegram-apps/telegram-ui';
import { Text } from '@telegram-apps/telegram-ui';

export const FrontPage = () => {
    return (
        <Page>
            <List>
                <Section>
                    <Cell>
                        <Text>
                            Front Page
                        </Text>
                    </Cell>
                </Section>
            </List>
        </Page>
    )
}