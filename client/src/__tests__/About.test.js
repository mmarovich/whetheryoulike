import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import About from '../About'

describe('About component', () => {
    it('renders About', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <About />
            </MemoryRouter>).toJSON()
        expect(tree).toMatchSnapshot();
    })
})