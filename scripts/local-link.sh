if [ "$1" = "" ]
then
    echo "ERROR: Project path not specified. Please provider one by running `yarn local-link \"../path/to/project\"`."
    exit 1
fi

lib_path="$PWD"
project_path="$PWD/$1"
[ ! -d "$project_path/node_modules" ] && echo "ERROR: Project path specified does not exist or does not contain a node_modules folder." && exit 1

[ ! -d "$project_path/node-modules/@BRIUS" ] && mkdir "$project_path/node-modules/@BRIUS"

module_path="$PWD/$1/node_modules/@BRIUS/design-system"
[ -d $module_path ] && rm -rf $module_path

pushd "$project_path/node_modules/@BRIUS"
ln -s $lib_path "design-system"
popd
