import React from "react";
import style from '../Style/Recipe.css';
import { Card, Image, Text, Badge, Button, Group, List, ThemeIcon,Grid,Table, Collapse   } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import { useState } from 'react';

const Recipe = ({title,calories,image,ingredients,id}) =>{
    const [opened, setOpened] = useState(false);

    const handleSubmitRecipe = (values, event) => {
        const registrationData = {tokenid: this.value};
        console.log(this.value)
        /*
        event.preventDefault();
        const data = new FormData(event.target);
        fetch('https://127.0.0.1:8000/recipe-submit', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(registrationData),
        }).then((response) => {
            console.log(response);
        });

         */
    };

    return (
        <Card style={{width: "80%", margin: "35px"}} shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={image}
                    height={160}
                    alt={title}
                    onClick={() => setOpened((o) => !o)}
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{title}</Text>
            </Group>
            <List
                spacing="xs"
                size="sm"
                center
                icon={
                    <ThemeIcon color="teal" size={24} radius="xl">
                        <IconCircleCheck size={16} />
                    </ThemeIcon>
                }
            >
                <br/><br/>
                <Grid>
                    <Grid.Col span={6}>
                        <Button onClick={() => setOpened((o) => !o)}>
                            Voir la recette
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Button onClick={handleSubmitRecipe} value={id} variant="light" color="blue" fullWidth mt="md" radius="md">
                            Ajouter au favoris
                        </Button>
                    </Grid.Col>
                </Grid>
                <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
                    {ingredients.map(ingredient=>(
                        <Grid style={{fontsize: "8pt"}}>
                            <Grid.Col span={8}><List.Item>{ingredient.text}</List.Item></Grid.Col>
                        </Grid>
                    ))}
                </Collapse>
            </List>
        </Card>
    );
}
export default Recipe;
