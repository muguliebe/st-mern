const user = {name: 'ss', email: '1@a.com', password:'123'}

const fn = ({name, ...rest}) => {
  console.log('name = ' + name)
  console.log('rest = ' ,{...rest})
}

fn(user)
