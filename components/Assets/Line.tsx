'use client'

import { Space } from "@mantine/core";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Line() {
    type DailyMoney = {
        date: Date,
        money: number,
    }

    type Series = {
        label: string,
        data: DailyMoney[]
    }

    const data: Series[] = [
        {
            label: 'Vault',
            data: [
                {
                    date: new Date("2022-03-25"),
                    money: 200,
                },
                {
                    date: new Date("2022-03-26"),
                    money: 300,
                },
                {
                    date: new Date("2022-03-27"),
                    money: 400,
                },
                {
                    date: new Date("2022-03-28"),
                    money: 300,
                },
                {
                    date: new Date("2022-03-29"),
                    money: 300,
                },
                {
                    date: new Date("2022-03-30"),
                    money: 500,
                }, {
                    date: new Date("2022-03-31"),
                    money: 650,
                }
                , {
                    date: new Date("2022-04-01"),
                    money: 600,
                }
                , {
                    date: new Date("2022-04-02"),
                    money: 700,
                }
                // ...
            ]
        },
    ]

    const primaryAxis = React.useMemo<
        AxisOptions<DailyMoney>
    >(
        () => ({
            getValue: datum => datum.date,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<DailyMoney>[]
    >(
        () => [
            {
                getValue: datum => datum.money,
            },
        ],
        []
    );

    return (
        <>
            <Space h="xl" />

            <div style={{ minWidth: 300, maxWidth: 500, height: 350, background: "#072f37" }}>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        dark: true,
                        padding: 10,

                    }}
                />
            </div>


        </>
    );
}
