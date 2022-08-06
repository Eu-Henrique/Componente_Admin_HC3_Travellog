import React from 'react'
import {IconPlus, ButtonWithIcon } from 'vtex.styleguide'

const plus = <IconPlus/>

function head() {
    return(
        <form action='/admin/app/newcomposition'>
            <ButtonWithIcon icon={plus} type='submit'>Criar Combinação</ButtonWithIcon>
        </form>
    )
}

export default head