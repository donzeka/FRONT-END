import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import CategoryType from '../../types/CategoryType';

interface CategoryPageProperties {
    match: {
        params: {
            cId: number;
        }
    }
}

interface CategoryPageState {
    category?: CategoryType;
}

export default class CategoryPage extends React.Component<CategoryPageProperties> {
    state: CategoryPageState;

    constructor(props: CategoryPageProperties | Readonly<CategoryPageProperties>){
        super(props);

        this.state = { };
    }

    render(){
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt}/>  {this.state.category?.catName}
                        </Card.Title>

                        <Card.Text>
                            Here, we will have our products...
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    componentWillMount() {
        this.getCategoryData();
    }

    componentWillReceiveProps(newProperties: CategoryPageProperties){
        if(newProperties.match.params.cId === this.props.match.params.cId) {
            return;
        }

        this.getCategoryData();
    }

    private getCategoryData(){
        setTimeout(() => {
            const data: CategoryType = {
                catName: 'Category' + this.props.match.params.cId,
                categoryId: this.props.match.params.cId,
                items: []
            };

            this.setState({
                category: data,
            })
        }, 210);
    }
}