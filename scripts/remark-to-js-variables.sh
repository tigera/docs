#!/bin/bash

base_dir=(
calico
calico_versioned_docs/version-3.27
calico_versioned_docs/version-3.26
calico_versioned_docs/version-3.25
calico_versioned_docs/version-3.24
calico-enterprise
calico-enterprise_versioned_docs/version-3.18-2
calico-enterprise_versioned_docs/version-3.18
calico-enterprise_versioned_docs/version-3.17
calico-enterprise_versioned_docs/version-3.16
calico-enterprise_versioned_docs/version-3.15
calico-cloud
calico-cloud_versioned_docs/version-18-2
calico-cloud_versioned_docs/version-18
calico-cloud_versioned_docs/version-3.17
)

variables_standard=(
baseUrl
calicoReleasesURL
chart_version_name
clouddownloadbase
clouddownloadurl
cloudoperatorimage
cloudversion
downloadsurl
filesUrl
filesUrl_CE
imageassuranceversion
manifestsUrl
manifestsURL
nodecontainer
noderunning
ppa_repo_name
prodname
prodnameWindows
prodnamedash
prodnamedashWindows
registry
releaseTitle
rootDirWindows
tigeraOperator
tigeraOperatorVersionShort
tmpScriptsURL
tutorialFilesURL
version
vppbranch
windowsScriptsURL
)



##################################
# Variable replacement functions #
##################################

process_variables_standard() {
  local search_string="$1"
  # Find all files once and process them in a single pass
  find "${base_dir[@]}" -type f -name "*.mdx" -exec perl -0777 -pi -e "s/\{\{\s*($search_string)\s*\}\}/\{variables\.\$1\}/g" {} +
  echo "Processed files for standard global variable $search_string"
}
process_variables_special() {
  find "${base_dir[@]}" -type f -name "*.mdx" -exec perl -0777 -pi -e "s/\{\{\s*(imageNames.*?)\s*\}\}/\{variables\.\$1\}/s" {} +
  find "${base_dir[@]}" -type f -name "*.mdx" -exec perl -0777 -pi -e "s/\{\{\s*(releases.*?)\s*\}\}/\{variables\.\$1\}/s" {} +
  echo "Processed files for special global variables imageNames and releases"
}

global_variables (){
  echo "Processing standard global variables in MDX files"

  for search_string in "${variables_standard[@]}"; do
      process_variables_standard "$search_string"
  done

  echo "Processing special global variables in MDX files"

  process_variables_special
}

##################################
# Modify fenced code blocks      #
##################################

convert_fenced_code_blocks () {
  regex="s/(\s*)(\x60\x60\x60)(\w*?)\n(?=.*{{.*}})(.+?)(\s*)(\x60\x60\x60)/\${1}<CodeBlock language='\${3}'>\n\${4}\${5}<\/CodeBlockpickle>/g"
  find "${base_dir[@]}" -type f -name "*.mdx" -exec perl -0777 -pi -e "$regex" {} +
}

add_import_codeblocks () {
  local path=$1
  local escaped_path=$(echo "$path" | sed 's/\//\\\//g; s/\./\\./g')
  local import_line="import CodeBlock from \'\@theme\/CodeBlock'\;"
  find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/^(---\n(.*?\n)---\n)(?=.*pickle)/\$1\n$import_line\n/s" {} +
  find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/CodeBlockpickle/CodeBlock/g" {} +
}


##################################
# Add variable.js import lines   #
##################################

add_import_variables () {
    local path=$1
    local escaped_path=$(echo "$path" | sed 's/\//\\\//g; s/\./\\./g')
    local import_line="import variables from \'\@site\/$escaped_path\/variables\'\;"
    find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/^(---\n(.*?\n)---\n)/\$1\n$import_line\n/g" {} +

    # Add import lines to content _includes
    find "$path" -type f -name "_*.mdx" -exec perl -0777 -pi -e "s/^(?!---)/$import_line\n\n/s" {} +
}

add_import_statements () {
  for path in "${base_dir[@]}"; do
    add_import_codeblocks "$path"
    add_import_variables "$path"
    find $path -type f -name "*.mdx" -exec perl -0777 -pi -e "s/;\n\nimport CodeBlock/;\nimport CodeBlock/s" {} +
  done
}



# Uncomment for testing
#git restore . && echo "git restore ."

echo "Converting fenced code blocks"
convert_fenced_code_blocks
echo "Converting fenced code blocks COMPLETE"

echo "Adding import statements"
add_import_statements
echo "Adding import statements COMPLETE"

echo "Converting global variables"
global_variables
echo "Converting global variables COMPLETE"
sleep 2
echo "(You can run the MDX2 checker by uncommenting the final section in the script"
# Check for MDX errors on converted files
# npx docusaurus-mdx-checker -c calico && echo "Running MDX checker"   # check directory
# npx docusaurus-mdx-checker && echo "Running MDX checker              # check all
sleep 2
echo "Have a nice day!"

exit