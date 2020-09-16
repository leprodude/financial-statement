import React from 'react'
import { render, RenderOptions, queries, RenderResult } from "@testing-library/react"
import { FinancialsProvider } from "../contexts/FinancialsContext"
import { FormProvider } from "../contexts/FormContext"

type providerProps = {
    children?: React.ReactNode
}

const allProviders = (props: providerProps) => {
    const {children} = props;
    return (
        <FinancialsProvider>
            <FormProvider>
                    {children}
            </FormProvider>
        </FinancialsProvider>
    )
}

function renderWithProviders (ui: React.ReactElement, options?: Pick<RenderOptions<typeof queries>, "container" | "baseElement" | "hydrate" | "wrapper"> | undefined): RenderResult {
    return render(ui, { wrapper: allProviders, ...options })
}

// re-export everything
export * from "@testing-library/react"

// export custom render method
export { renderWithProviders }