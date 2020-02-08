// utils
const findTokenBefore = (group, token) => {
  const index = group.indexOf(token)
  if (index < 0) {
    return
  }
  return group[index - 1]
}
const findTokenAfter = (group, token) => {
  const index = group.indexOf(token)
  if (index < 0) {
    return
  }
  return group[index + 1]
}
const findContentTokenBefore = (group, token) => {
  const index = group.indexOf(token)
  if (index < 0) {
    return
  }
  const tokenBefore = findTokenBefore(group, token)
  if (!tokenBefore) {
    return
  }
  if (tokenBefore.type.match(/^content\-/)) {
    return tokenBefore
  } else if (tokenBefore.type === 'mark-hyper') {
    return findContentTokenBefore(group, group[index - 1])
  }
  return 
}
const findContentTokenAfter = (group, token) => {
  const index = group.indexOf(token)
  if (index < 0) {
    return
  }
  const tokenAfter = findTokenAfter(group, token)
  if (!tokenAfter) {
    return
  }
  if (tokenAfter.type.match(/^content\-/)) {
    return tokenAfter
  } else if (tokenAfter.type === 'mark-hyper') {
    return findContentTokenBefore(group, group[index + 1])
  }
}

module.exports = {
  findTokenBefore,
  findTokenAfter,
  findContentTokenBefore,
  findContentTokenAfter
}