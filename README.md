## @yanayg/hierarchy-tag-group
![npm](https://img.shields.io/npm/v/@yanayg/hierarchy-tag-group.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@yanayg/hierarchy-tag-group.svg)

## Install

```
$ npm install @yanayg/hierarchy-tag-group
```

## Example

**Removing keywords**

![Closing tags](https://i.gyazo.com/9451e66a33b8b2ef5e7147b59a274b8e.gif)

**Adding back keywords**

notice the tags collapsing back because all tags are present

![Adding the tab back](https://i.gyazo.com/99a7a9df88cdd2a4f9307cd94256dde8.gif)

## Usage

```js
...
import {HierarchyTagGroup} from '@yanayg/hierarchy-tag-group';

class App extends React.Component {
    state = {
        data: ['all']
    };
    
    render() {
        return (
            <HierarchyTagGroup
                schema={{
                    all: { 
                        tag: {},
                        tag2: {
                            tag3: {},
                            tag4: {}
                        }
                    }
                }}
                data={this.state.data}
                onChange={(dt) => this.setState({data: dt}) }
                tooltip
            />
        )
    }
}
```