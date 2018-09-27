module.exports = {
    hooks: {
        'commit-msg': 'commitlint -e $GIT_PARAMS',
        'pre-commit': 'npm t',
        'pre-push': 'npm t'
    }
};
